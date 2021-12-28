import {LocalStorageControllerService} from "../../storage/browser-local-storage/local-storage-controller.service";
import {Injectable} from "@angular/core";
import {QuizProgressStateInterface} from "../../models/quiz-progress-state.interface";

@Injectable({

  providedIn: 'root'
})

export class QuizStateService {

  constructor(private localStorageControllerService: LocalStorageControllerService) {

  }

  saveState(state: QuizProgressStateInterface): void {
    let newStateId = state.variantId;
    let transformedState = {
      _id: newStateId,
      payload: state
    }
    this.localStorageControllerService.create(transformedState)
    // console.log(`State saved in service with id: ${transformedState._id} and payload:`)
    // console.log(transformedState.payload)
  }

  getSavedState():QuizProgressStateInterface {
    // console.log('Asked for saved state:')
    // console.log(this.localStorageControllerService.readById())
    // @ts-ignore
    return this.localStorageControllerService.readById();
  }

  deleteSavedState(state: QuizProgressStateInterface): void {
    let deletedStateId = state.variantId;
    this.localStorageControllerService.delete(deletedStateId);
  }

}
