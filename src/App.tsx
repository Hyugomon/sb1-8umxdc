import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import TeamSelector from './components/TeamSelector';
import StatsTable from './components/StatsTable';
import { parseExcel, extractTeams } from './utils/excelParser';
import { calculateTeamStats } from './utils/statsCalculator';
import { Match, TeamStats } from './types';
import { Calculator } from 'lucide-react';

function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [localTeam, setLocalTeam] = useState<string>('');
  const [visitaTeam, setVisitaTeam] = useState<string>('');
  const [localStats, setLocalStats] = useState<TeamStats | null>(null);
  const [visitaStats, setVisitaStats] = useState<TeamStats | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const parsedMatches = await parseExcel(file);
      setMatches(parsedMatches);
      const extractedTeams = extractTeams(parsedMatches);
      setTeams(extractedTeams);
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      alert('Hubo un error al procesar el archivo. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCalculate = () => {
    if (localTeam && visitaTeam) {
      const localTeamStats = calculateTeamStats(matches, localTeam);
      const visitaTeamStats = calculateTeamStats(matches, visitaTeam);
      setLocalStats(localTeamStats);
      setVisitaStats(visitaTeamStats);
    } else {
      alert('Por favor, selecciona ambos equipos antes de calcular.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Analizador de Estadísticas de Fútbol</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <FileUploader onFileUpload={handleFileUpload} />
                {teams.length > 0 && (
                  <>
                    <TeamSelector
                      teams={teams}
                      onSelectLocal={setLocalTeam}
                      onSelectVisita={setVisitaTeam}
                    />
                    <button
                      onClick={handleCalculate}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Calculator className="mr-2" />
                      Calcular datos y probabilidades
                    </button>
                  </>
                )}
              </div>
              {localStats && visitaStats && (
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <StatsTable stats={localStats} teamName={localTeam} isLocal={true} />
                  <StatsTable stats={visitaStats} teamName={visitaTeam} isLocal={false} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;