import {Request, Response} from 'express';
import {sessionEndpoint} from '../session-endpoint';
import {SingleUseCookieJar} from '../http/single-use-cookie-jar';
import {prepareRequest} from '../http/prepare-request';
import {defaultHandlerFunctionFor} from '../http/default-handler-function-for';
import {handleError} from '../http/handle-error';
import {Trainingsschema} from '../api/trainingsschema';
import {prepareResponse} from '../http/prepare-response';

export function fetchTrainingsschema(originalRequest: Request, eventualResponse: Response): void {

  const cookieJar = new SingleUseCookieJar();
  prepareRequest(originalRequest, cookieJar);

  defaultHandlerFunctionFor(sessionEndpoint, 'get')(originalRequest, cookieJar).then(session => {
      if (session.loggedIn) {
        prepareResponse(eventualResponse, originalRequest, cookieJar);
        eventualResponse.status(200).send(trainingsschema);
      } else {
        throw {status: 401, meldingen: ['U dient eerst in te loggen']};
      }
    }
  ).catch(handleError(eventualResponse, originalRequest, cookieJar));
}

const trainingsschema: Trainingsschema = {
    "A": [
      {
        "titel": "Week 33", "inhoud": [
          {
            "datum": "2018-08-15",
            "omschrijving": "10 min 75%, 3 x 8 min 80% 2 min 75%, 10 min 75%",
            "locatie": "Richting paddepoelsterbrug"
          },
          {
            "datum": "2018-08-18",
            "omschrijving": "10 min 75%, 4 x 6 min 80-85% 2 min 75%, 10 min 75%",
            "locatie": "Driebond"
          },
          {"titel": "eigen 3e training", "datum": "2018-08-20", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 34", "inhoud": [
          {"datum": "2018-08-22", "omschrijving": "Bootcamp", "locatie": "Kardingeveld, bij regen Waterschap"},
          {"datum": "2018-08-25", "omschrijving": "Fartlektraining 50 min", "locatie": "Kardingegebied"},
          {"titel": "eigen 3e training", "datum": "2018-08-27", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 35", "inhoud": [
          {"datum": "2018-08-29", "omschrijving": "Pyramyde, 2-4-6-4-2 90%, 2 min rust 75%", "locatie": "Zilvermeer"},
          {
            "datum": "2018-09-01",
            "omschrijving": "Kilometertest 1e 80-85% 2e 90% 3e 100% 4 85% 5e 75%",
            "locatie": "Fietspad Zuidwolde"
          },
          {"titel": "eigen 3e training", "datum": "2018-09-03", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 36", "inhoud": [
          {
            "datum": "2018-09-05",
            "omschrijving": "Duurloop 50 min, inclusief 3 x 1 min 85% 1 min 80% na 20 min",
            "locatie": "Rondje Zuidwolde"
          },
          {
            "datum": "2018-09-08",
            "omschrijving": "Duurloop 50 min  inclusief techniek (hete kolen, ballonnetje en touwtje)",
            "locatie": "Kardingegebied"
          },
          {"titel": "eigen 3e training", "datum": "2018-09-10", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 37", "inhoud": [
          {
            "datum": "2018-09-12",
            "omschrijving": "10 min 75%, 2 x 12 min 80% 3 min 70%, 10 min 75%",
            "locatie": "Rondje voetbalveld"
          },
          {"datum": "2018-09-15", "omschrijving": "Bostraining, Nije Hemelriek", "locatie": "Nije Hemelriek"},
          {"titel": "eigen 3e training", "datum": "2018-09-17", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 38", "inhoud": [
          {"datum": "2018-09-19", "omschrijving": "Duurloop 50 min 75%", "locatie": "Driebond"},
          {"datum": "2018-09-22", "omschrijving": "Thesinge 4 km, 4mijl, 10 km en 1/2 marathon", "locatie": "Thesinge"},
          {"titel": "eigen 3e training", "datum": "2018-09-24", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 39", "inhoud": [
          {
            "datum": "2018-09-26",
            "omschrijving": "10 min 75%, 7 x 2 min 85% 2 min 75%, 10 min 75%",
            "locatie": "Mollukkenplantsoen"
          },
          {
            "datum": "2018-09-29",
            "omschrijving": "Pyramyde, 3-5-7-5-3 90%, 2 min rust 75%",
            "locatie": "Voetbalveld/Zilvermeer"
          },
          {"titel": "eigen 3e training", "datum": "2018-10-01", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 40", "inhoud": [
          {
            "datum": "2018-10-03",
            "omschrijving": "Duurloop 50 min 75% , na 15&30 min 5 min 85%",
            "locatie": "Noordijkerweg"
          },
          {
            "datum": "2018-10-06",
            "omschrijving": "Duurloop met techniekoefeningen, 50 min 75%",
            "locatie": "Koningslaagte"
          },
          {"titel": "eigen 3e training", "datum": "2018-10-08", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 41", "inhoud": [
          {
            "datum": "2018-10-10",
            "omschrijving": "10 min 75%, 3 x 8 min 85% 2 min 70%, 10 min 75%",
            "locatie": "Rondje zuidwolde"
          },
          {"datum": "2018-10-13", "omschrijving": "Bostraining, Norg", "locatie": "Norg"},
          {"titel": "eigen 3e training", "datum": "2018-10-15", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 42", "inhoud": [
          {
            "datum": "2018-10-17",
            "omschrijving": "15 min 75%, 1 x (5 x 100 meter 95% 100 meter dribbel) / 2 x km 85% (naar 500m en terug), 3 min rust, 15 min 75%",
            "locatie": "Tot aan 500m punt 4 mijl startpunt"
          },
          {"datum": "2018-10-20", "omschrijving": "Fartlektraining 50 min", "locatie": "Kardingegebied"},
          {"titel": "eigen 3e training", "datum": "2018-10-22", "omschrijving": "Duurloop 50 min 75%"}]
      },


      {
        "titel": "Week 43", "inhoud": [
          {"datum": "2018-10-24", "omschrijving": "Duurloop 50 min 75%", "locatie": "Driebond"},
          {"datum": "2018-10-27", "omschrijving": "Dwingeloo", "locatie": "Dwingeloo"}]
      }

    ],

    "B": [
      {
        "titel": "Week 33", "inhoud": [
          {
            "datum": "2018-08-15",
            "omschrijving": "10 min 75%, 4 x 8 min 80% 2 min 75%, 10 min 75%",
            "locatie": "Richting paddepoelsterbrug"
          },
          {
            "datum": "2018-08-18",
            "omschrijving": "10 min 75%, 6 x 6 min 80-85% 2 min 75%, 10 min 75%",
            "locatie": "Driebond"
          },
          {"titel": "eigen 3e training", "datum": "2018-08-20", "omschrijving": "Duurloop 70 min 75%"}]
      },


      {
        "titel": "Week 34", "inhoud": [
          {"datum": "2018-08-22", "omschrijving": "Bootcamp", "locatie": "Kardingeveld, bij regen Waterschap"},
          {"datum": "2018-08-25", "omschrijving": "Fartlektraining 60 min", "locatie": "Kardingegebied"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-08-27",
            "omschrijving": "Duurloop 70 min 75%, laatste 10 min 80%"
          }]
      },


      {
        "titel": "Week 35", "inhoud": [
          {"datum": "2018-08-29", "omschrijving": "Pyramyde, 2-4-6-6-4-2 90%, 2 min rust 75%", "locatie": "Zilvermeer"},
          {
            "datum": "2018-09-01",
            "omschrijving": "Kilometertest 1e 80-85% 2e 90% 3e 100% 4 85% 5e 75%",
            "locatie": "Fietspad Zuidwolde"
          },
          {
            "titel": "eigen 3e training",
            "datum": "2018-09-03",
            "omschrijving": "Duurloop 75 min 75%, laatste 10 min 80%"
          }]
      },


      {
        "titel": "Week 36", "inhoud": [
          {
            "datum": "2018-09-05",
            "omschrijving": "Duurloop 60 min, inclusief 3 x 1 min 85% 1 min 80% na 20 min",
            "locatie": "Rondje Zuidwolde"
          },
          {
            "datum": "2018-09-08",
            "omschrijving": "Duurloop 65 min inclusief techniek (hete kolen, ballonnetje en touwtje)",
            "locatie": "Kardingegebied"
          },
          {
            "titel": "eigen 3e training",
            "datum": "2018-09-10",
            "omschrijving": "Duurloop 80 min 75%, laatste 10 min 80%"
          }]
      },


      {
        "titel": "Week 37", "inhoud": [
          {
            "datum": "2018-09-12",
            "omschrijving": "10 min 75%, 3 x 12 min 80% 3 min 70%, 10 min 75%",
            "locatie": "Rondje voetbalveld"
          },
          {"datum": "2018-09-15", "omschrijving": "Bostraining, Nije Hemelriek", "locatie": "Nije Hemelriek"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-09-17",
            "omschrijving": "Duurloop 85 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 38", "inhoud": [
          {"datum": "2018-09-19", "omschrijving": "Duurloop 65 min 75%", "locatie": "Driebond"},
          {"datum": "2018-09-22", "omschrijving": "Thesinge 4 km, 4mijl, 10 km en 1/2 marathon", "locatie": "Thesinge"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-09-24",
            "omschrijving": "Duurloop 90 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 39", "inhoud": [
          {
            "datum": "2018-09-26",
            "omschrijving": "10 min 75%, 9 x 2 min 85% 2 min 75%, 10 min 75%",
            "locatie": "Mollukkenplantsoen"
          },
          {
            "datum": "2018-09-29",
            "omschrijving": "Pyramyde, 2-4-6-6-4-2 90%, 2 min rust 75%",
            "locatie": "Voetbalveld/Zilvermeer"
          },
          {"titel": "eigen 3e training", "datum": "2018-10-01", "omschrijving": "Duurloop 100 min 75%"}]
      },


      {
        "titel": "Week 40", "inhoud": [
          {
            "datum": "2018-10-03",
            "omschrijving": "Duurloop 70 min 75% , na 15&30 min 5 min 85%",
            "locatie": "Noordijkerweg"
          },
          {
            "datum": "2018-10-06",
            "omschrijving": "Duurloop met techniekoefeningen, 70 min 75%",
            "locatie": "Koningslaagte"
          },
          {
            "titel": "eigen 3e training",
            "datum": "2018-10-08",
            "omschrijving": "Duurloop 110 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 41", "inhoud": [
          {
            "datum": "2018-10-10",
            "omschrijving": "10 min 75%, 5 x 8 min 85% 2 min 70%, 10 min 75%",
            "locatie": "Rondje zuidwolde"
          },
          {"datum": "2018-10-13", "omschrijving": "Bostraining, Norg", "locatie": "Norg"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-10-15",
            "omschrijving": "Duurloop 120 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 42", "inhoud": [
          {
            "datum": "2018-10-17",
            "omschrijving": "15 min 75%, 2 sessies (1 x (5 x 100 meter 95% 100 meter dribbel) / 2 x km 85% (naar 500m en terug), 3 min rust), 15 min 75%",
            "locatie": "Tot aan 500m punt 4 mijl startpunt"
          },
          {"datum": "2018-10-20", "omschrijving": "Fartlektraining 60 min", "locatie": "Kardingegebied"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-10-22",
            "omschrijving": "Duurloop 120 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 43", "inhoud": [
          {"datum": "2018-10-24", "omschrijving": "Duurloop 65 min 75%", "locatie": "Driebond"},
          {"datum": "2018-10-27", "omschrijving": "Dwingeloo", "locatie": "Dwingeloo"}]
      }
    ],

    "C": [
      {
        "titel": "Week 33", "inhoud": [
          {
            "datum": "2018-08-15",
            "omschrijving": "10 min 75%, 5 x 8 min 80% 2 min 75%, 10 min 75%",
            "locatie": "Richting paddepoelsterbrug"
          },
          {
            "datum": "2018-08-18",
            "omschrijving": "10 min 75%, 8  x 8 min 80-85% 2 min 75%, 10 min 75%",
            "locatie": "Driebond"
          },
          {"titel": "eigen 3e training", "datum": "2018-08-20", "omschrijving": "Duurloop 90 min 75%"}]
      },


      {
        "titel": "Week 34", "inhoud": [
          {"datum": "2018-08-22", "omschrijving": "Bootcamp", "locatie": "Kardingeveld, bij regen Waterschap"},
          {"datum": "2018-08-25", "omschrijving": "Fartlektraining 70 min", "locatie": "Kardingegebied"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-08-27",
            "omschrijving": "Duurloop 90 min 75%, laatste 10 min 80%"
          }]
      },


      {
        "titel": "Week 35", "inhoud": [
          {"datum": "2018-08-29", "omschrijving": "Pyramyde, 2-4-6-8-6-4-2 90%, 2 min rust 75%", "locatie": "Zilvermeer"},
          {
            "datum": "2018-09-01",
            "omschrijving": "Kilometertest 1e 80-85% 2e 90% 3e 100% 4 85% 5e 75%",
            "locatie": "Fietspad Zuidwolde"
          },
          {
            "titel": "eigen 3e training",
            "datum": "2018-09-03",
            "omschrijving": "Duurloop 90 min 75%, laatste 10 min 80%"
          }]
      },


      {
        "titel": "Week 36", "inhoud": [
          {
            "datum": "2018-09-05",
            "omschrijving": "Duurloop 70 min, inclusief 3 x 1 min 85% 1 min 80% na 20 min",
            "locatie": "Rondje Zuidwolde"
          },
          {
            "datum": "2018-09-08",
            "omschrijving": "Duurloop i75 min inclusief techniek (hete kolen, ballonnetje en touwtje)",
            "locatie": "Kardingegebied"
          },
          {
            "titel": "eigen 3e training",
            "datum": "2018-09-10",
            "omschrijving": "Duurloop 100 min 75%, laatste 10 min 80%"
          }]
      },


      {
        "titel": "Week 37", "inhoud": [
          {
            "datum": "2018-09-12",
            "omschrijving": "10 min 75%, 4 x 12 min 80% 3 min 70%, 10 min 75%",
            "locatie": "Rondje voetbalveld"
          },
          {"datum": "2018-09-15", "omschrijving": "Bostraining, Nije Hemelriek", "locatie": "Nije Hemelriek"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-09-17",
            "omschrijving": "Duurloop 110 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 38", "inhoud": [
          {"datum": "2018-09-19", "omschrijving": "Duurloop 75 min 75%", "locatie": "Driebond"},
          {"datum": "2018-09-22", "omschrijving": "Thesinge 4 km, 4mijl, 10 km en 1/2 marathon", "locatie": "Thesinge"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-09-24",
            "omschrijving": "Duurloop 120 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 39", "inhoud": [
          {
            "datum": "2018-09-26",
            "omschrijving": "10 min 75%, 11 x 2 min 85% 2 min 75%, 10 min 75%",
            "locatie": "Mollukkenplantsoen"
          },
          {
            "datum": "2018-09-29",
            "omschrijving": "Pyramyde, 2-4-6-8-6-4-2 90%, 2 min rust 75%",
            "locatie": "Voetbalveld/Zilvermeer"
          },
          {"titel": "eigen 3e training", "datum": "2018-10-01", "omschrijving": "Duurloop120 min 75%"}]
      },


      {
        "titel": "Week 40", "inhoud": [
          {
            "datum": "2018-10-03",
            "omschrijving": "Duurloop 90 min 75% , na 15&30 min 5 min 85%",
            "locatie": "Noordijkerweg"
          },
          {
            "datum": "2018-10-06",
            "omschrijving": "Duurloop met techniekoefeningen, 90 min 75%",
            "locatie": "Koningslaagte"
          },
          {
            "titel": "eigen 3e training",
            "datum": "2018-10-08",
            "omschrijving": "Duurloop 120 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 41", "inhoud": [
          {
            "datum": "2018-10-10",
            "omschrijving": "10 min 75%, 6 x 8 min 85% 1 min 70%, 10 min 75%",
            "locatie": "Rondje zuidwolde"
          },
          {"datum": "2018-10-13", "omschrijving": "Bostraining, Norg", "locatie": "Norg"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-10-15",
            "omschrijving": "Duurloop 120 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 42", "inhoud": [
          {
            "datum": "2018-10-17",
            "omschrijving": "15 min 75%, 2 sessies (1 x (5 x 100 meter 95% 100 meter dribbel) / 2 x km 85% (naar 500m en terug), 3 min rust), 15 min 75%",
            "locatie": "Tot aan 500m punt 4 mijl startpunt"
          },
          {"datum": "2018-10-20", "omschrijving": "Fartlektraining 70 min", "locatie": "Kardingegebied"},
          {
            "titel": "eigen 3e training",
            "datum": "2018-10-22",
            "omschrijving": "Duurloop 120 min 75%, laatste 10 min 85%"
          }]
      },


      {
        "titel": "Week 43", "inhoud": [
          {"datum": "2018-10-24", "omschrijving": "Duurloop 75 min 75%", "locatie": "Driebond"},
          {"datum": "2018-10-27", "omschrijving": "Dwingeloo", "locatie": "Dwingeloo"}]
      }
    ]
  }
;
