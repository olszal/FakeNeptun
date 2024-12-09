export interface Course {
    title: string;
    description: string;
    teacher_id: string;
    timetable: string;
    room: string;
    student_limit: number;
    student_ids: string[];
    accepted: boolean;
    _id?: string;
}