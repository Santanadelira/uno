import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export const navitems = [
    {
        id: 1,
        titulo: 'Dashboard',
        path: '../',
        cargos: ["ADMIN", "VENDEDOR", "ANALISTA", "EXPEDICAO"],
    },
    {
        id: 2,
        titulo: 'Solicitantes',
        cargos: ["ADMIN", "VENDEDOR"],
        dropdown: [
            {
                id: 'd1',
                titulo: "Cadastrar",
                descricao: "Cadastre um novo solicitante no sistema!",
                path: "/solicitantes/cadastrar",
                icon: PlusCircleIcon,
                cargos: ["ADMIN", "VENDEDOR"],
            },
            {
                id: 'd2',
                titulo: "Consultar",
                descricao: "Consulte as informações dos solicitantes!",
                path: "/solicitantes/consultar",
                icon: MagnifyingGlassIcon,
                cargos: ["ADMIN", "VENDEDOR"],
            },
        ]
    },
    {
        id: 3,
        titulo: 'Solicitações de Análise',
        cargos: ["ADMIN", "VENDEDOR", "ANALISTA"],
        dropdown: [
            {
                id: 'd1',
                titulo: "Cadastrar",
                descricao: "Cadastre um nova solicitação de análise no sistema!",
                path: "/solicitacoes-de-analise/cadastrar",
                icon: PlusCircleIcon,
                cargos: ["ADMIN", "VENDEDOR"]
            },
            {
                id: 'd2',
                titulo: "Consultar",
                descricao: "Consulte as informações das solicitações de análise!",
                path: "/solicitacoes-de-analise/consultar",
                icon: MagnifyingGlassIcon,
                cargos: ["ADMIN", "VENDEDOR", "ANALISTA"]
            },
        ]
    }, 
    {
        id: 4,
        titulo: 'Itens de análise',
        cargos: ["ADMIN", "EXPEDICAO", "ANALISTA"],
        dropdown: [
            {
                id: 'd1',
                titulo: "Cadastrar",
                descricao: "Registre a chegado dos itens de análise no laboratório!",
                path: "/itens-de-analise/cadastrar",
                icon: PlusCircleIcon,
                cargos: ["ADMIN", "EXPEDICAO", "ANALISTA"],
            },
            {
                id: 'd2',
                titulo: "Consultar",
                descricao: "Consulte as informações dos itens de análise!",
                path: "/itens-de-analise/consultar",
                icon: MagnifyingGlassIcon,
                cargos: ["ADMIN", "EXPEDICAO", "ANALISTA"],
            },
        ]
    },
    {
        id: 5,
        titulo: 'Usuários',
        cargos: ["ADMIN"],
        dropdown: [
            {
                id: 'd1',
                titulo: "Cadastrar",
                descricao: "Cadastre um novo usuário!",
                path: "/usuarios/cadastrar",
                icon: PlusCircleIcon,
                cargos: ["ADMIN"]
            }
        ]
    }
]