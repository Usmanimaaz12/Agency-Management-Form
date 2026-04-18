// AOR, PERFORMANCE MARKETING, SOCIAL MEDIA MARKETING, OTHERS
export type AgencyTypes = "AOR" | "PERFORMANCE MARKETING" | "SOCIAL MEDIA MARKETING" | "OTHERS";

export interface IPOC{
    id: number;
    gender: string;
    name: string;
    email?: string;
    countryCode?: string;
    phoneNumber?: number;
    
}
export interface IAgency {
    id: number;
    agencyName: string;
    agencyType: AgencyTypes;
    completionDate: Date;
    notes: string;
    pocs: IPOC[];
}