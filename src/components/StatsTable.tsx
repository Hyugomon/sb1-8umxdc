import React from 'react';
import { TeamStats } from '../types';

interface StatsTableProps {
  stats: TeamStats;
  teamName: string;
  isLocal: boolean;
}

const StatsTable: React.FC<StatsTableProps> = ({ stats, teamName, isLocal }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3" colSpan={2}>
              Estadísticas de {teamName} ({isLocal ? 'Local' : 'Visita'})
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              Promedio de goles anotados
            </th>
            <td className="px-6 py-4">
              {isLocal ? stats.golesAnotadosLocal.toFixed(2) : stats.golesAnotadosVisita.toFixed(2)}
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              Promedio de goles cedidos
            </th>
            <td className="px-6 py-4">
              {isLocal ? stats.golesCedidosLocal.toFixed(2) : stats.golesCedidosVisita.toFixed(2)}
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              Fuerza de ataque
            </th>
            <td className="px-6 py-4">
              {isLocal ? stats.fuerzaAtaqueLocal.toFixed(2) : stats.fuerzaAtaqueVisita.toFixed(2)}
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              Fuerza de defensa
            </th>
            <td className="px-6 py-4">
              {isLocal ? stats.fuerzaDefensaLocal.toFixed(2) : stats.fuerzaDefensaVisita.toFixed(2)}
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              Marcador más probable
            </th>
            <td className="px-6 py-4">
              {isLocal ? stats.marcadorProbableLocal : stats.marcadorProbableVisita}
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              Goles totales
            </th>
            <td className="px-6 py-4">
              {isLocal ? stats.golesTotalesLocal : stats.golesTotalesVisita}
            </td>
          </tr>
          <tr className="bg-white">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              Efectividad
            </th>
            <td className="px-6 py-4">
              {isLocal ? stats.efectividadLocal.toFixed(2) : stats.efectividadVisita.toFixed(2)}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;