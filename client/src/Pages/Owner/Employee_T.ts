export type AddingEmployee_T = {
     fullName: string,
     email: string,
     phoneNumber: string,
     role: string | null,
     password: string,
     confirm_password: string
}


export type Employee_T = {
     id: number,
     fullName: string,
     email: string,
     phoneNumber: string,
     role: string
}