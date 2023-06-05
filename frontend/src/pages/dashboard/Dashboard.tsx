import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2'

ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    solicitacoes: 0,
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
        data: [dashboard.ensaios, dashboard.ensaiosPendente, dashboard.ensaiosEmAndamento, dashboard.ensaiosConcluidos],
        backgroundColor: 'rgba(79, 70, 229)', // Optional: Set the background color
        borderColor: 'rgba(75, 192, 192, 0)', // Optional: Set the border color
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

        <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"> 
          <div className="sm:col-span-3">
            <Bar key={chartKey} data={data} options={options} />
            </div>
        </div>
      </div>
    </div>
  )) : (<div></div>)
};

export default Dashboard;
