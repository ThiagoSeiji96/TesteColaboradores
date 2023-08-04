import { Component, OnInit } from '@angular/core';

interface Job {
  id: number;
  descricao: string;
  dataMaximaDaEntrega: Date;
  tempoEstimadoTarefa: string;
}

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})


export class JobComponent implements OnInit {
  jobs: Job[] = [
    {
      id: 1,
      descricao: "Importação de arquivos de fundos",
      dataMaximaDaEntrega: new Date('2023-08-04 12:00:00'),
      tempoEstimadoTarefa: '8 horas'
    },
    {
      id: 2,
      descricao: 'Importação de dados da Base Legada',
      dataMaximaDaEntrega: new Date('2023-08-04 12:00:00'),
      tempoEstimadoTarefa: '4 horas'
    },
    {
      id: 3,
      descricao: 'Importação de dados',
      dataMaximaDaEntrega: new Date('2023-08-05 12:00:00'),
      tempoEstimadoTarefa: '6 horas'
    },
    {
      id: 4,
      descricao: 'Desenvolver historia 745',
      dataMaximaDaEntrega: new Date('2023-08-03 12:00:00'),
      tempoEstimadoTarefa: '2 horas'
    },
    {
      id: 5,
      descricao: 'Gerar QRCode',
      dataMaximaDaEntrega: new Date('2023-08-05 12:00:00'),
      tempoEstimadoTarefa: '6 horas'
    },
    {
      id: 6,
      descricao: 'Importação de dados de integração',
      dataMaximaDaEntrega: new Date('2023-08-06 12:00:00'),
      tempoEstimadoTarefa: '8 horas'
    },
  ];
  matrizJobsHelper: Job[][]= [];

  ParseTempoEstimadoTarefa(tempo: string){
    const splitString = tempo.split(' ');
    const valor = parseInt(splitString[0], 10);
    const unidade = splitString[1].toLowerCase();

    if(unidade === 'hora' || unidade === 'horas'){
      return valor * 60;
    }
    else if (unidade === 'minuto' || unidade === 'minutos')
    {
      return valor;
    }
    else
    {
      return 0;
    }
  }

  CriarSequenciaDeListaDeJobs(listaJob: Job[], tempoParaFinalizarLista: number, periodoInicio: Date, periodoFinal: Date): Job[][]{
    const sequenciaDeLista: Job[][] = [];
    let listaAtual: Job[] = [];
    let tempoTotalParaExecutar = 0;

    listaJob.sort((a, b) => a.dataMaximaDaEntrega.getTime() - b.dataMaximaDaEntrega.getTime())

    for(const job of listaJob){
      if(job.dataMaximaDaEntrega >= periodoInicio && job.dataMaximaDaEntrega <= periodoFinal && (job.dataMaximaDaEntrega.getTime() - parseInt(job.tempoEstimadoTarefa) <= periodoFinal.getTime())){

        if(tempoTotalParaExecutar + this.ParseTempoEstimadoTarefa(job.tempoEstimadoTarefa) <= tempoParaFinalizarLista){

          listaAtual.push(job);
          tempoTotalParaExecutar +=  this.ParseTempoEstimadoTarefa(job.tempoEstimadoTarefa);

          for(const kob of listaJob){
            if(tempoTotalParaExecutar + this.ParseTempoEstimadoTarefa(kob.tempoEstimadoTarefa) <= tempoParaFinalizarLista && kob != job){

              if(kob.id in sequenciaDeLista){
                break
              }
              else
              {
                listaAtual.push(kob);
                tempoTotalParaExecutar +=  this.ParseTempoEstimadoTarefa(kob.tempoEstimadoTarefa);
              }
            }
          }
        }
        else
        {
          sequenciaDeLista.push([...listaAtual]);
          listaAtual = [job];
          tempoTotalParaExecutar = this.ParseTempoEstimadoTarefa(job.tempoEstimadoTarefa);
        }
      }

      // Cada array do conjunto representa uma lista de Jobs a serem executados em sequência;
      // Todos os Jobs devem ser executados dentro da janela de execução (data início e fim).
      // Cada array deve conter jobs que sejam executados em, no máximo, 8h;
      // Deve ser respeitada a data máxima de conclusão do Job;
    }
    sequenciaDeLista.push([...listaAtual]);
    return sequenciaDeLista;
  }


  ngOnInit(): void {
    const periodoInicio = new Date('2023-08-04 08:00:00') // Data de início da janela de execução
    const periodoFinal = new Date('2023-08-15');  // Data de fim da janela de execução
    const duracaoOitoHorasEmMinutos = 8 * 60;     // 8 horas em minutos
    this.matrizJobsHelper = this.CriarSequenciaDeListaDeJobs(this.jobs, duracaoOitoHorasEmMinutos, periodoInicio, periodoFinal);
  }


}
