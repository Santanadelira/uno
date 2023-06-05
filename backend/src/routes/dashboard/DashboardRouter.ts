import express from 'express'
import { dashboard } from '../../controllers/dashboard/DashboardController'

export default (router : express.Router) => {
    router.get('/dashboard', dashboard)
}