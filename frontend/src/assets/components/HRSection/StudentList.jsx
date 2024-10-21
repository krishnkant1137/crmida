import React from 'react';

const StudentList = ({ students, onViewProfile }) => {
  return (
    <div className="p-4 pt-20">
      {students.map((student) => (
        <div
          key={student.rollNumber}
          className="flex items-center justify-between p-2 bg-white rounded shadow mb-2"
        >
          <div>
            <img
              src={student.passportPhoto}
              alt={`${student.fullName}'s photo`}
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-2">{student.fullName}</span>
          </div>
          <button
            onClick={() => onViewProfile(student)}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
