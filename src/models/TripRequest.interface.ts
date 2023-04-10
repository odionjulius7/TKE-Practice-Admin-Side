interface userdto {
  email?: string;
  postCode?: string;
  age?: string | number;
  gender?: string;
  lastName?: string;
  firstName?: string;
  userType?: string;
  phoneNumber?: string | number;
}
interface tripDetailsdto {
  AdultsCeleberatingWith?: number | string;
  anythingElseAboutCelebration?: string;
  childrenCelebratingWith?: number | string;
  choiceActivityWhileTravelling?: string[];
  daysToSpendCelebrating?: number | string;
  estimateGuestToCelebrateWith?: number | string;
  howSoonDoYouWantToBook?: string;
  likeToCelebrateWhat?: string;
  occationYouAreCelebrating?: string;
  setDateForCel?: string;
  whatCityYouMostLikelyExpectQuests?: string;
  whatTKEServiceDoYouWant?: string;
  //
  anyDateSet?: string;
  daysLikelyToSpend?: string | number;
  enterDateToArrive?: string;
  enterDateToTravel?: string;
  ideaMonthYear?: string;
  needVisa?: boolean;
  numberOfTravellerAdult?: string | number;
  numberOfTravellerKids?: string | number;
  travelForWhat?: string;
  travelWithWho?: string;
  whatCity?: string;
  whereTo?: string;
  // choiceActivityWhileTravelling?: number | string;
}

export interface TripRequest {
  user: userdto;
  tripDetails: tripDetailsdto;
  _id: string | number;
  tripType: string;
  createdAt: string;
  updatedAt: string;
  requestStatus: string;
}
export interface Trips {
  user: string;
  _id: string | number;
  visa: any;
  flightDetails: any;
  agreements: any;
  payment: any;
  travelConfirmation: any;
  overview: any;
}
