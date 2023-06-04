import { MagnifyingGlassIcon, PencilIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export const navitems = [
    {
        id: 1,
        titulo: 'Dashboard',
        path: '../',
    },
    {
        id: 2,
        titulo: 'Solicitantes',
        dropdown: [
            {
                id: 'd1',
                titulo: "Cadastrar",
                descricao: "Cadastre um novo solicitante no sistema!",
                path: "/solicitantes/cadastrar",
                icon: PlusCircleIcon
            },
            {
                id: 'd2',
                titulo: "Consultar",
                descricao: "Consulte as informações dos solicitantes!",
                path: "/solicitantes/consultar",
                icon: MagnifyingGlassIcon
            },
        ]
    },
    {
        id: 3,
        titulo: 'Solicitações de Análise',
        dropdown: [
            {
                id: 'd1',
                titulo: "Cadastrar",
                descricao: "Cadastre um nova solicitação de análise no sistema!",
                path: "/solicitacoes-de-analise/cadastrar",
                icon: PlusCircleIcon
            },
            {
                id: 'd2',
                titulo: "Consultar",
                descricao: "Consulte as informações das solicitações de análise!",
                path: "/solicitacoes-de-analise/consultar",
                icon: MagnifyingGlassIcon
            },
        ]
    }, 
    {
        id: 4,
        titulo: 'Itens de análise',
        dropdown: [
            {
                id: 'd1',
                titulo: "Cadastrar",
                descricao: "Registre a chegado dos itens de análise no laboratório!",
                path: "/itens-de-analise/cadastrar",
                icon: PlusCircleIcon
            },
            {
                id: 'd2',
                titulo: "Consultar",
                descricao: "Consulte as informações das solicitações de análise!",
                path: "/solicitacoes-de-analise/consultar",
                icon: MagnifyingGlassIcon
            },
        ]
    },
    {
        id: 5,
        titulo: 'Usuários',
        path: '../usuarios',
    }
]