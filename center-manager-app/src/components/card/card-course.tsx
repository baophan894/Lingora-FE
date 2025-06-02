import React from 'react';
import type { CardCourse } from '../../types/index';

export const CardCourseComponents: React.FC<{ course: CardCourse }> = ({ course }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold">{course.title}</h2>
      <p className="text-gray-600">{course.description}</p>
      <div className="mt-2">
        <span className="text-sm text-gray-500">Duration: {course.duration}</span>
      </div>
    </div>
  );
};