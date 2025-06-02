export interface CardCourse {
   code: string;
   name: string;
   description: string;
   language: string;
   level: string;
   feeFull: number;
   feeInstallment: number;
   durationWeeks: number;
   totalSlots: number;
   createdAt: string;
   topics: [string];
   isActive: boolean;
}

export interface CardDetail {}
