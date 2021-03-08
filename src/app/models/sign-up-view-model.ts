export class SignUpViewModel
{
    PersonName: any;
    Email: string;
    Mobile: string;
    DateOfBirth: string;
    Password: string;
    Gender: string;
    CountryID: number;
    ReceiveNewsLetters: boolean;
    Skills: any;

    constructor(PersonName: any = null,
        Email: string = null,
        Mobile: string = null,
        DateOfBirth: string = null,
        Password: string = null,
        Gender: string = null,
        CountryID: number = null,
        ReceiveNewsLetters: boolean = false,
        Skills: any = null,)
    {
        this.PersonName = PersonName;
        this.Email = Email;
        this.Mobile = Mobile;
        this.DateOfBirth = DateOfBirth;
        this.Password = Password;
        this.Gender = Gender;
        this.CountryID = CountryID;
        this.ReceiveNewsLetters = ReceiveNewsLetters;
        this.Skills = Skills;
    }
}
