import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const repeatPassword = control.get('repeatPassword');
  if (
    newPassword &&
    repeatPassword &&
    newPassword?.value != repeatPassword?.value
  ) {
    return {
      passwordMatchError: true,
    };
  }
  return null;
};
