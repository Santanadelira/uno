import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Chart } from "chart.js";
import { Bar } from 'react-chartjs-2'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    solicitacoes: 0,
    solicitantes: 0,
    itensDeAnalise: 0,
    ensaios: 0,
    ensaiosPendente: 0,
    ensaiosEmAndamento: 0,
    ensaiosConcluidos: 0,
  });

  const getDashboard = async () => {
    const response = await axios.get(
      "https://uno-production.up.railway.app/dashboard"
    );
    console.log(response.data)
    setDashboard(response.data);
  };

  useEffect(() => {
    getDashboard();
  }, []);

  const data = {
    labels: ['Total de ensaios', 'Ensaios pendentes', 'Ensaios em andamento', "Ensaios concluídos"],
    datasets: [
      {
        label: 'Ensaios',
        data: [dashboard.ensaios, dashboard.ensaiosPendente, dashboard.ensaiosPendente, dashboard.ensaiosConcluidos],
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional: Set the background color
        borderColor: 'rgba(75, 192, 192, 1)', // Optional: Set the border color
        borderWidth: 1, // Optional: Set the border width
      },
    ],
  };

  const options = {
    responsive: true,
  };

  const [chartKey] = useState(0);


  return dashboard ? ( (
    <div>
      <Navbar />
      <div className="w-5/6 mx-auto mt-7">
        <div className="border-b border-gray-900/10 pb-7">
          <h2 className="text-base font-inter font-semibold leading-7 text-gray-900">
            Dashboard
          </h2>
          <p className="font-inter mt-1 text-sm leading-6 text-gray-600">
            Visão geral das informações do laboratório
          </p>
        </div>

        <div>
          <dl className="divide-y divide-gray-900/10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Total de Solicitações de Análise
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {dashboard.solicitacoes}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Total de solicitantes cadastrados
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {dashboard.solicitantes}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Total de itens de análise disponíveis
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {dashboard.itensDeAnalise}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Total de ensaios em andamento
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {dashboard.ensaiosEmAndamento}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Total de ensaios finalizados
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {dashboard.ensaiosConcluidos}
              </dd>
            </div>
          </dl>
        </div>

        <div className=" w-96 h-96 mt-7">
        <div className="border-b border-gray-900/10 pb-7">
          <h2 className="text-base font-inter font-semibold leading-7 text-gray-900">
            Ensaios
          </h2>
          <p className="font-inter mt-1 text-sm leading-6 text-gray-600">
            Status dos ensaios no laboratório
          </p>
        </div>
          <Bar data={data} options={options} key={chartKey} >
          </Bar>
        </div>
      </div>
    </div>
  )) : (<div></div>)
};

export default Dashboard;
