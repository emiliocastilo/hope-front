export default class PasiUtils {
  static getPGAOptions() {
    return [
      { id: 0, label: '0' },
      { id: 1, label: '1' },
      { id: 2, label: '2' },
      { id: 3, label: '3' },
      { id: 4, label: '4' },
      { id: 5, label: '5' },
      { id: 6, label: '6' },
    ];
  }

  static getCalificationPasi(pasi: any) {
    const score = parseFloat(pasi);
    switch (true) {
      case score < 10:
        return 'Blanqueado';
      case score < 20:
        return 'Leve';
      case score < 40:
        return 'Moderado';
      case score < 60:
        return 'Moderado-severo';
      case score < 80:
        return 'Severo';
      case score < 100:
        return 'Severo-grave';
    }
  }

  static getCalificationBsa(bsa: any) {
    const score = parseFloat(bsa);
    switch (true) {
      case score < 3:
        return 'Leve';
      case score < 11:
        return 'Moderada';
      case score < 21:
        return 'Severa';
      case score < 100:
        return 'Severa-grave';
    }
  }

  static selectPGA(option) {
    switch (option) {
      case '0':
        return 'Blanqueada';
      case '1':
        return 'Casi blanqueada minima';
      case '2':
        return 'Leve';
      case '3':
        return 'Leve a moderada';
      case '4':
        return 'Moderada';
      case '5':
        return 'Moderada a grave';
      case '6':
        return 'Grave';
    }
  }

  static parseEntriesForm(values: any) {
    const form = [];
    const entry = {
      type: 'pasi-form',
      name: 'pasi',
      value: values,
    };
    form.push(entry);
    return form;
  }

  static parseFormFilled(filledForm: any) {
    console.log(filledForm);
  }
}
