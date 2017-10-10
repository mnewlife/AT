module GrocRoundAdminTracksServiceInterfaces {

  /*******************************************/

  import track = Track;
  import round = Round;

  export interface Instance {
    getTracks: GetTracks;
    getTrack: GetTrack;
    addTrack: AddTrack;
    updateTrack: UpdateTrack;
  }

  /*******************************************/

  export interface AddDetails {
    round: round.RoundInfo;
    trackName: string;
    contributions: {
      installmentValue: number;
      totalValue: number;
    };
    adminFeePercentage: number;
  }

  /******************************************************************************/

  export type UpdateDetails = Partial<{
    trackName: string;
    contributions: Partial<{
      installmentValue: number;
      totalValue: number;
    }>;
    adminFeePercentage: number;
  }>;

  /*******************************************/

  export interface GetTracks {
    ( round: string ): ng.IPromise<track.Super[]>;
  }

  export interface GetTrack {
    ( trackId: string ): ng.IPromise<track.Super>;
  }

  export interface AddTrack {
    ( details: AddDetails ): ng.IPromise<track.Super>;
  }

  export interface UpdateTrack {
    ( trackId: string, details: UpdateDetails ): ng.IPromise<track.Super>;
  }

  /*******************************************/

}
