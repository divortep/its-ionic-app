export interface Task {
    id: string;
    createdDate: Date;
    number: string;
    date: string;
    timeSlot: string;
    address: string;
    quotedTime: string;
    items: string[];
    hasPAX: boolean;
}

export interface AcceptedTask extends Task {
    acceptedDate: Date;
    withTeammate: boolean;
}
