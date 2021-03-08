import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country';
import { CustomValidatorsService } from '../../directives/custom-validators.service';
import { SignUpViewModel } from '../../models/sign-up-view-model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../guards/can-deactivate-guard.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, CanComponentDeactivate {

  signUpForm: FormGroup;
  genders = ["Male", "Female"];
  countries: Country[] = [];
  registerError: string = null;

  constructor(private countryService: CountriesService, private formBuilder: FormBuilder,
    private customValidatorsService: CustomValidatorsService, private loginService: LoginService, private router: Router) {

  }
  canLeave: boolean;

  ngOnInit() {
    this.countryService.getCountries().subscribe((response) => {
      this.countries = response;
    });

    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      }),
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)], [this.customValidatorsService.DuplicateEmailValidator()]],
      // mobile: [null, [Validators.required, Validators.min(10), Validators.max(10), Validators.pattern(/^[0-9]*$/)]],
      mobile: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dateOfBirth: [null, [Validators.required, this.customValidatorsService.minimumAgeValidator(18)]],
      password: [null, [Validators.required, Validators.maxLength(100)]],
      confirmPassword: [null, [Validators.required, Validators.maxLength(100)]],
      gender: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      receiveNewsLetters: [''],
      // skills: this.formBuilder.array([ this.createItem() ])
      skills: this.formBuilder.array([])
    }
      , {
        validators: [
          this.customValidatorsService.compareValidator("confirmPassword", "password")
        ]
      }
    );
    //For get all values of SignUpForm at the time of filling
    this.signUpForm.valueChanges.subscribe((value) => {
      //console.log(value);
      //this.canLeave = false;
    });
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      skillName: null,
      level: null
    });
  }
  onSubmitClick() {
    //Display current form value
    this.signUpForm["submitted"] = true;
    console.log(this.signUpForm);

    if (this.signUpForm.valid) {
      var signUpVieModel = this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpVieModel).subscribe(
        (response) => {
          this.canLeave = true;
          this.router.navigate(["/employee", "tasks"]);
        },
        (error) => {
          console.log(error);
          this.registerError = "Unable to submit";
        });
    }

    //setValue
    // this.signUpForm.setValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com",
    //   mobile: "9876543210",
    //   dateOfBirth: "2020-01-01",
    //   gender: "male",
    //   countryID: 3,
    //   receiveNewsLetters: true
    // });

    //patchValue
    // this.signUpForm.patchValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });

    //reset
    // this.signUpForm.reset();

    //reset with Parameters
    // this.signUpForm.reset({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });
  }
  onAddSkill() {
    var formGroup = new FormGroup({
      skillName: new FormControl(null),
      level: new FormControl(null)
    });

    (<FormArray>this.signUpForm.get("skills")).push(formGroup);
    // this.skills = this.signUpForm.get('skills') as FormArray;
    // this.skills.push(this.createItem());
  }

  onRemoveClick(index: number) {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }

}
