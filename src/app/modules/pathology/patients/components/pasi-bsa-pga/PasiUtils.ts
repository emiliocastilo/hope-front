export default class PasiUtils {
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

    static getCalificationNapsi(napsi: any) {
        const score = parseFloat(napsi);
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
        switch (option.toString()) {
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

        Object.entries(values).forEach((e: any) => {
            if (typeof e[1] !== 'object') {
                const entry = {
                    type: 'input',
                    name: e[0],
                    value: e[1],
                };
                form.push(entry);
            }
        });

        Object.entries(values).forEach((e) => {
            if (Object.entries(e[1]).length === 1) {
                const ob = {
                    area: '',
                    eritema: '',
                    escamas: '',
                    infiltracion: '',
                    total: '',
                };
                Object.assign(values[e[0]], ob);
            }
        });

        form.push({
            type: 'form',
            name: 'form',
            value: JSON.stringify(values),
        });
        return form;
    }

    static parseNailsForm(values: any) {
        const form = [
            {
                type: 'datepicker',
                name: 'evaluationDate',
                value: values.evaluationDate,
            },
            {
                type: 'input',
                name: 'napsiScore',
                value: values.napsiScore ? values.napsiScore : 0,
            },
        ];

        form.push({
            type: 'form',
            name: 'form',
            value: JSON.stringify(values),
        });
        return form;
    }
}
