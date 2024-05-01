import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase-config";
import { collection, query, where, getDocs } from 'firebase/firestore';
import NavbarT from "./components/NavbarTwo";
 
 
// Function to generate star icons based on rating
function renderStars(rating) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} style={{ color: "gold" }}>&#9733;</span>); // Filled star with gold color
    } else {
      stars.push(<span key={i}>&#9734;</span>); // Empty star
    }
  }
  return stars;
}

// Comment Card component
function CommentCard({ comment }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-semibold"><span className="font-bold">Utilisateur :</span>  {comment.username}</p>
          <p className="text-gray-600"><span className="text-lg text-gray-800 file:font-bold">Prof :</span> {comment.instructorName}</p>
          <p className="text-gray-600"><span className="text-lg text-gray-800 file:font-bold">Programme :</span> {comment.programmeText}</p>
          <p className="text-gray-600"><span className="text-lg text-gray-800 file:font-bold">commentaire :</span>{comment.comment}</p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-700">Rating: {renderStars(comment.rating)}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewDayProf() {
  const { day } = useParams();
  const [instructorComments, setComments] = useState([]);

  useEffect(() => {
    async function fetchCommentsAndRatings() {
      try {
        const q = query(
          collection(db, 'programme-details'),
          where('isInstructorComment', '==', true),
          where('day', '==', parseInt(day))
        );
        const querySnapshot = await getDocs(q);

        const fetchedComments = [];

        // Iterate over the documents in the query snapshot
        for (const doc of querySnapshot.docs) {
          // Fetch comments associated with this programme details ID
          const commentsQuerySnapshot = await getDocs(
            query(
              collection(db, 'programme-details-comments'),
              where('programmeDetailsId', '==', doc.id)
            )
          );

          // Fetch programme text from programme-details collection
          const programmeText = doc.data().text;
          const profName = doc.data().subText;

          // Iterate over the comments query snapshot
          for (const commentDoc of commentsQuerySnapshot.docs) {
            // Get the comment data
            const commentData = commentDoc.data();
            const firstComment = Object.values(commentData.instructorComment)[0];
            const instructorName = commentData.instructorComment.instructorName;
            const comment = commentData.instructorComment.comment;

            // Fetch username from users collection based on userEmail
            const userQuerySnapshot = await getDocs(
              query(
                collection(db, 'users'),
                where('email', '==', commentData.userEmail)
              )
            );

            // Get the username
            let username = "";
            userQuerySnapshot.forEach((userDoc) => {
              const userData = userDoc.data();
              username = userData.username;
            });



            const profName = instructorName;
          
            fetchedComments.push({
              type: 'user',
              instructorComment: firstComment,
              rating: commentData.rating,
              username: username,
              programmeText: programmeText,
              comment:comment,
              profName: profName, // Use profName instead of instructorName if they are equivalent
              instructorName: instructorName
            });
          }
        }
        

        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments and ratings:', error);
      }
    }

    // Call the function to fetch comments and ratings
    fetchCommentsAndRatings();
  }, [day]); // Re-run the effect when the "day" parameter changes

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarT />
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Commentaires pour chaque jour
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {instructorComments.map((instructorComment, index) => (
            <CommentCard key={index} comment={instructorComment} />
          ))}
        </div>
      </div>
    </div>
  );
}
