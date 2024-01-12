import React from 'react';
import ReviewModal from '../components/grade/ReviewModal';
import { useParams } from 'react-router-dom';

function DetailReviewPage() {
  const { classId, reviewId } = useParams();

  return <ReviewModal item={{ classId, reviewId }} />;
}

export default DetailReviewPage;
