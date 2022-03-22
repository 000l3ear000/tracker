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

export const castingColumns = [
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
        name: 'Type',
        selector: row => row.selector,
        omit: true,
    },
    {
        name: 'Description',
        selector: row => row.description,
    },
];

export const productColumns = [
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
        name: 'Type',
        selector: row => row.selector,
        omit: true,
    },
    {
        name: 'Drawing_no',
        selector: row => row.drawing_no,
        sortable: true,
    },

    {
        name: 'Weight',
        selector: row => row.weight,
        sortable:true
    },
    {
        name: 'Price',
        selector: row => row.price,
        sortable:true
    },
    {
        name: 'Casting',
        selector: row => row.casting,
        sortable:true
    },
];