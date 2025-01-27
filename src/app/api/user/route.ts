/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

const studentData = [
  { id: "110", Name: "Shahzain Ali", Age: "21", Institute: "GIAIC" },
  { id: "111", Name: "Fatima", Age: "19", Institute: "PIAIC" },
];

export async function GET() {
  return NextResponse.json(studentData);
}

export async function POST(request: NextRequest) {
  const newStudent = await request.json();
  studentData.push(newStudent);
  return NextResponse.json({
    message: "Student added successfully!",
    studentData,
  });
}

export async function PUT(request: NextRequest) {
  try {
    const { id, Name } = await request.json();

    // Find the index of the student with the given ID and update a object Name
    const studentIndex = studentData.findIndex((student) => student.id === id);

    if (studentIndex === -1) {
      return NextResponse.json(
        { error: "Student not found!" },
        { status: 404 }
      );
    }

    // Update the name of the found student
    studentData[studentIndex].Name = Name;

    return NextResponse.json({
      message: "Student updated successfully!",
      updatedStudent: studentData[studentIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
};

export async function DELETE(request: NextRequest) {
   
      const {id} = await request.json();
  
      // Find the index of the student with the given ID and update a object Name
      const studentIndex = studentData.findIndex((student) => student.id === id);
  
      if (studentIndex === -1) {
        return NextResponse.json(
          { error: "Student not found!" },
          { status: 404 }
        );
      }

      studentData.splice(studentIndex,1)

      return NextResponse.json({
        message: "Student Data Deleted successfully!",
        deleteStudent: studentData[studentIndex],
      });
}