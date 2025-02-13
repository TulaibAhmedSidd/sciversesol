import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/mongodb';
import TeamMember from '../models/TeamMember';

export async function GET() {
  await connectToDatabase();
  try {
    const members = await TeamMember.find();
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();
  try {
    const { name, role, experience, desc, img } = await req.json();
    const newMember = new TeamMember({ name, role, experience, desc, img });
    const savedMember = await newMember.save();
    return NextResponse.json(savedMember, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 });
  }
}

export async function PATCH(req) {
  await connectToDatabase();
  try {
    const { id, name, role, experience, desc, img } = await req.json();
    const updatedMember = await TeamMember.findByIdAndUpdate(
      id,
      { name, role, experience, desc, img },
      { new: true }
    );
    if (!updatedMember) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectToDatabase();
  try {
    const { id } = await req.json();
    const deletedMember = await TeamMember.findByIdAndDelete(id);
    if (!deletedMember) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Team member deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
