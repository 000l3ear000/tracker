export const companyColumns = [
    {
        name: 'Id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Description',
        selector: row => row.description,
    },
];

export const productionHallColumns = [
    {
        name: 'Id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Company',
        selector: row => row.company,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
];

export const workplaceColumns = [
    {
        name: 'Id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Company',
        selector: row => row.company,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Production Hall',
        selector: row => row.production_hall,
        // sortable: true,
    },
    {
        name: 'Rate per hour',
        selector: row => row.rate_per_hour,
        sortable: true,
    },
];

export const workplaceGroupColumns = [
    {
        name: 'Id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Company',
        selector: row => row.company,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Production Hall',
        selector: row => row.production_hall,
        // sortable: true,
    },
    {
        name: 'Workplaces',
        selector: row => row.workplaces,
        // sortable: true,
    },
];



