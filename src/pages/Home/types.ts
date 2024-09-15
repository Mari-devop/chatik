export interface Question {
    questionId: number;
    question: string;
};

export interface IndividualWithoutFullImage {
    id: number;
    name: string;
    title: string;
    smallImage: string;
}