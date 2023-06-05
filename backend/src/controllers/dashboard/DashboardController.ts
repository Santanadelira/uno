import express from 'express'
import { prisma } from '../../prisma/prisma'
import { StatusEnsaio } from '@prisma/client'

export const dashboard = async (req: express.Request, res: express.Response) => {
    const dashboard = {
        solicitacoes: await prisma.solicitacaoDeAnalise.count(),
        ensaios: await prisma.ensaio.count({
            where: {
                statusEnsaio: {
                    not: StatusEnsaio.Concluida
                }
            }
        }),
        ensaiosPendente: await prisma.ensaio.count({
            where: {
                statusEnsaio: StatusEnsaio.Pendente
            }
        }),
        ensaiosEmAndamento: await prisma.ensaio.count({
            where: {
                statusEnsaio: StatusEnsaio.EmAnalise
            }
        }),
    }

    return res.status(200).json(dashboard)
    
}