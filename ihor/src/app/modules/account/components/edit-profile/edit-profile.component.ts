import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProfileWPassword} from '../../model/profile';
import {AuthService} from 'src/app/modules/auth/services/auth.service';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profile: ProfileWPassword = {
    password: '',
    name: '',
    surname: '',
    profilePicture: null,
    telephoneNumber: '',
    email: '',
    address: '',
  };

  private id: number;

  public imageError: string;
  public isImageSaved: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.id = 0;
    this.imageError = '';
    this.isImageSaved = false;
  }

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.email, Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.id = this.authService.getId();

    this.profileService.getProfile(this.id).subscribe({
      next: (profile) => {
        this.profile.name = profile.name;
        this.profile.surname = profile.surname;
        this.profile.profilePicture = profile.profilePicture;
        this.profile.telephoneNumber = profile.telephoneNumber;
        this.profile.email = profile.email;
        this.profile.address = profile.address;
        this.isImageSaved = profile.profilePicture != null;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fileChangeEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    const fileInput = target.files as FileList;


    this.imageError = '';
    if (fileInput && fileInput[0]) {

      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return;
      }

      if (!allowed_types.includes(fileInput[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {

        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs: any) => {

          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return;
          } else {
            const imgBase64Path = e.target.result;
            this.profile.profilePicture = imgBase64Path;
            this.isImageSaved = true;
          }
        };
      };

      reader.readAsDataURL(fileInput[0]);
    }
  }
  edit() {
    if (this.profileForm.valid) {
      this.profileService.update(this.id, this.profile).subscribe({
        next: () => {
          this.router.navigate([this.getProfileRoute()]);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  getProfileRoute() {
    if (this.authService.getRole() === "PASSENGER") {
      return "/passenger/profile";
    }
    if (this.authService.getRole() === "DRIVER") {
      return "/driver/profile";
    }
    return "/administrator/profile";
  }

  editPassword() {
    this.router.navigate(['/edit-password']);
  }
}
