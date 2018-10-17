import { environment } from '../environments/environment';

export enum Roles {
  User = 0,
  Supervisor = 1,
  Admin = 2
}

export class Constants {
  public static readonly SERVICE_URL = environment.SERVICE_URL;
  public static readonly GUID_EMPTY = '00000000-0000-0000-0000-000000000000';
  // tslint:disable-next-line:max-line-length
  public static readonly REGEX_EMAIL_PATTERN = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*\;?$/;
  public static readonly REGEX_ZIPCODE_USCANADA_PATTERN = /^(\d{5}-\d{4}|\d{5}|\d{9})$|^([a-zA-Z]\d[a-zA-Z]( )?\d[a-zA-Z]\d)$/;
  public static readonly REGEX_PHONE_PATTERN = /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/;
  public static readonly REGEX_EIN_PATTERN = /^\d{2}-\d{7}$|^\d{2} \d{7}$|^\d{3}-\d{2}-\d{4}$|^\d{3} \d{2} \d{4}$|^\d{9}$/;
  public static readonly REGEX_FAX_PATTERN = /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/;
  public static readonly REGEX_SSN_PATTERN = /^\d{3}-\d{2}-\d{4}$|^\d{9}$/;
  // tslint:disable-next-line:max-line-length
  public static readonly REGEX_CURRENCY_PATTERN = /^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$|^-$/;
  public static readonly REGEX_GUID = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
  public static readonly REGEX_NUMBER_WITHOUT_DECIMAL = /^\d+$/;
  public static readonly REGEX_NUMBER_WITH_2DECIMALS = /^\d*\.?\d{0,2}$/;
  public static readonly REGEX_NUMBER_WITH_3DECIMALS = /^\d*\.?\d{0,3}$/;

  public static YEARS: number[] = Constants.loadYears();
  public static HOURS: any[] = Constants.generateTimes();

  private static loadYears(): number[] {
    const years: number[] = [];

    const yearCount = 50;
    for (let i = new Date().getFullYear() + 1; i > new Date().getFullYear() - yearCount; i--) {
      years.push(i);
    }
    return years;
  }

  private static generateTimes(): any[] {
    const items = [];
    let amOrPm = 'AM';
    for (let i = 0; i < 24; i++) {
      if (i >= 12) {
        amOrPm = 'PM';
      }
      let hour = i;
      if (i === 0) {
        hour = 12;
      } else if (i > 12) {
        hour = i - 12;
      }
      items.push({ value: i, name: hour + ':00 ' + amOrPm });
      items.push({ value: i + 0.25, name: hour + ':15 ' + amOrPm });
      items.push({ value: i + 0.5, name: hour + ':30 ' + amOrPm });
      items.push({ value: i + 0.75, name: hour + ':45 ' + amOrPm });
    }
    return items;
  }

  public static isGuid(id: string): boolean {
    if (id) {
      const regexGuid = Constants.REGEX_GUID;
      return regexGuid.test(id);
    } else {
      return false;
    }
  }
}
