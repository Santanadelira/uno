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
                descricao: "Consulte as informações dos solicitantes e suas solicitações de análise!",
                path: "/solicitantes/consultar",
                icon: MagnifyingGlassIcon
            },
            {
                id: 'd3',
                titulo: "Gerenciar",
                descricao: "Gerencie as informações dos solicitantes!",
                path: "/solicitantes/gerenciar",
                icon: PencilIcon
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
            {
                id: 'd3',
                titulo: "Gerenciar",
                descricao: "Gerencie as informações das solicitações de análise!",
                path: "/solicitacoes-de-analise/gerenciar",
                icon: PencilIcon
            },
        ]
    }, 
    {
        id: 4,
        titulo: 'Análises',
        path: '../analises',
    },
    {
        id: 5,
        titulo: 'Usuários',
        path: '../usuarios',
    }
]