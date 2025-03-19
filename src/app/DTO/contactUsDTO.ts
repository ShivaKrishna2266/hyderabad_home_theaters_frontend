export interface ContactUsDTO {

    id: number;
    name: string;
    emailId: string;
    phoneNo: string;
    countryCode: number;
    subject: string;
    message: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    leadStatus: string;
}