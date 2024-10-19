import React from 'react';

interface TeamSelectorProps {
  teams: string[];
  onSelectLocal: (team: string) => void;
  onSelectVisita: (team: string) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, onSelectLocal, onSelectVisita }) => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex-1">
        <label htmlFor="local-team" className="block mb-2 text-sm font-medium text-gray-900">
          Selecciona equipo local
        </label>
        <select
          id="local-team"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => onSelectLocal(e.target.value)}
        >
          <option value="">Seleccionar equipo</option>
          {teams.map((team) => (
            <option key={`local-${team}`} value={team}>{team}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label htmlFor="visita-team" className="block mb-2 text-sm font-medium text-gray-900">
          Selecciona equipo Visita
        </label>
        <select
          id="visita-team"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => onSelectVisita(e.target.value)}
        >
          <option value="">Seleccionar equipo</option>
          {teams.map((team) => (
            <option key={`visita-${team}`} value={team}>{team}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeamSelector;