import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IdentityModel } from '../models/identity-model';
import { ElectionModel } from '../models/election-model';
import { VotingResultModel } from '../models/voting-result-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor() {}

  public getIdentity(identityProviderId: string): Observable<IdentityModel> {
    // TODO: Fetch Identity from an Identity Provider
    const identitiesMock: IdentityModel[] = [
      {
        id: '00000000001',
        firstName: 'Amy',
        lastName: 'Adams',
        sex: 'F',
        age: 20,
        country: 'Poland',
        region: 'Silesia',
      },
      {
        id: '00000000002',
        firstName: 'Bob',
        lastName: 'Cameron',
        sex: 'M',
        age: 30,
        country: 'Poland',
        region: 'Silesia',
      },
      {
        id: '00000000003',
        firstName: 'Diane',
        lastName: 'Princess',
        sex: 'F',
        age: 40,
        country: 'Poland',
        region: 'Lesser Poland',
      },
      {
        id: '00000000004',
        firstName: 'Toby',
        lastName: 'Done',
        sex: 'M',
        age: 50,
        country: 'Poland',
        region: 'Lesser Poland',
      },
    ];
    const randomIdentity = identitiesMock[
      Math.floor(Math.random() * identitiesMock.length)
    ];
    const delayMs = Math.floor(Math.random() * 1000 + 1000);
    return of(randomIdentity).pipe(delay(delayMs));
  }

  public getElections(identity: IdentityModel): Observable<ElectionModel[]> {
    // TODO: Get available Elections for specified Identity
    const electionsMock: ElectionModel[] = [
      {
        id: '0001-0001',
        name: 'The King of the North',
        photoUrl: 'https://i.pinimg.com/originals/3e/95/fd/3e95fd7e9fc1accebed325a74d4cfb02.png',
        isActive: false,
        items: [
          {
            id: '0001-0001-0001',
            name: 'Brandon Stark',
            photoUrl: 'https://vignette.wikia.nocookie.net/gameofthrones/images/8/81/KingBran.PNG/revision/latest?cb=20190520173855'
          },
          {
            id: '0001-0001-0002',
            name: 'Theon Greyjoy',
            photoUrl: 'https://vignette.wikia.nocookie.net/gameofthrones/images/7/78/TheonS8E1.PNG/revision/latest?cb=20190415192721'
          },
          {
            id: '0001-0001-0003',
            name: 'John Snow',
            photoUrl: 'https://vignette.wikia.nocookie.net/gameofthrones/images/d/d0/JonSnow8x06.PNG/revision/latest?cb=20190714094440'
          }
        ]
      },
      {
        id: '0001-0002',
        name: 'Master of Puppets',
        // tslint:disable-next-line:max-line-length
        photoUrl: 'https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2011/10/17/Style/Images/sesamestreet.jpg?uuid=iPdyLvhtEeCvhYhGIVt8PQ',
        isActive: true,
        items: [
          {
            id: '0001-0002-0001',
            name: 'Big Bird',
            photoUrl: 'https://a.wattpad.com/cover/181926860-352-k188102.jpg'
          },
          {
            id: '0001-0002-0002',
            name: 'Cookie Monster',
            photoUrl: 'https://i.ytimg.com/vi/9rrfjtm7RGE/maxresdefault.jpg'
          },
          {
            id: '0001-0002-0003',
            name: 'Oscar the Grouch',
            photoUrl: 'https://atlanta.momcollective.com/wp-content/uploads/2020/01/oscar-the-grouch-1000w.jpg'
          },
          {
            id: '0001-0002-0004',
            name: 'Elmo',
            photoUrl: 'https://images.radio-canada.ca/q_auto,w_1250/v1/ici-info/16x9/elmo-talk-show-enfants-hbo-famille.PNG'
          }
        ]
      },
      {
        id: '0001-0003',
        name: 'Favorite Color',
        // tslint:disable-next-line:max-line-length
        photoUrl: 'https://www.gflesch.com/hubfs/images/Blog_Images/2019%20Q1/printer-color-accuracy-tips.jpg',
        isActive: true,
        items: [
          {
            id: '0001-0003-0001',
            name: 'Red',
            photoUrl: 'https://i.ytimg.com/vi/FC1C4g8YOA4/hqdefault.jpg'
          },
          {
            id: '0001-0003-0002',
            name: 'Green',
            photoUrl: 'https://cache.desktopnexus.com/thumbseg/900/900690-bigthumbnail.jpg'
          },
          {
            id: '0001-0003-0003',
            name: 'Blue',
            photoUrl: 'https://media.gettyimages.com/photos/beautiful-woman-wearing-blue-dress-picture-id652928614'
          }
        ]
      },
      {
        id: '0001-0004',
        name: 'Best series in 2020',
        // tslint:disable-next-line:max-line-length
        photoUrl: 'https://fwcdn.pl/nph/49468/2018/15037.7.jpg',
        isActive: true,
        items: [
          {
            id: '0001-0004-0001',
            name: 'Our Planet',
            photoUrl: 'https://fwcdn.pl/fpo/47/61/814761/7880429.6.jpg'
          },
          {
            id: '0001-0004-0002',
            name: 'Chernobyl',
            photoUrl: 'https://fwcdn.pl/fpo/98/27/799827/7900027_1.6.jpg'
          },
          {
            id: '0001-0004-0003',
            name: 'Game of Thrones',
            photoUrl: 'https://fwcdn.pl/fpo/68/48/476848/7794141.6.jpg'
          },
          {
            id: '0001-0004-0004',
            name: 'Breaking Bad',
            photoUrl: 'https://fwcdn.pl/fpo/06/68/430668/7730445.6.jpg'
          },
          {
            id: '0001-0004-0005',
            name: 'Band of Brothers',
            photoUrl: 'https://fwcdn.pl/fpo/55/84/35584/7402986.6.jpg'
          }
        ]
      }
    ];
    const delayMs = Math.floor(Math.random() * 1000 + 1000);
    return of(electionsMock).pipe(delay(delayMs));
  }

  public getVotingResults(electionId: string): Observable<VotingResultModel[]> {
    // TODO: Read from Results Database
    const resultsMock: VotingResultModel[] = [];
    for (const voterRegion of ['Silesia', 'Lesser Poland']) {
      for (const voterSex of ['F', 'M']) {
        for (const voterAge of [20, 25, 30, 35, 45, 50, 55, 60, 65]) {
          for (const electionItemId of ['Brandon Stark', 'Theon Greyjoy', 'John Snow']) {
            const votingResult: VotingResultModel = {
              electionId,
              electionItemId,
              voterSex,
              voterAge,
              voterCountry: 'Poland',
              voterRegion,
              count: Math.floor(1000 + Math.random() * 9000)
            };
            resultsMock.push(votingResult);
          }
        }
      }
    }
    return of(resultsMock);
  }

  private getRandomArrayElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
