import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductSetting } from '../interfaces/iproduct-setting';
import { IFindingCost } from '../interfaces/ifinding-cost';
import { IStoneCost } from '../interfaces/istone-cost';
import { IMetalCost } from '../interfaces/imetal-cost';
import { ICncCost } from '../interfaces/icnc-cost';
import { ILacqueringCost } from '../interfaces/ilacquering-cost';
import { IPlatingCost } from '../interfaces/iplating-cost';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(
    private httpClient: HttpClient
  ) { }
  GetCurrentProductSetting() {
    return this.httpClient.get(environment.productsetting_url);
  }
  getCurrentWeather() {
    return this.httpClient.get<IProductSetting>('http://localhost:3000/productsetting');
  }

  calculateFindingCost(FindingName, FindingAmountOfMeasure, FindingQuantity) {
    return this.httpClient.post<IFindingCost>('http://localhost:3000/calculator/finding', {
      'finding_name': FindingName,
      'finding_amount_of_unit_of_measure': FindingAmountOfMeasure,
      'finding_quantity': FindingQuantity
    });
  }

  calculateStoneCost(StoneName, StoneSettingType, StoneAmountOfMeasure, StoneQuantity, Material) {
    return this.httpClient.post<IStoneCost>('http://localhost:3000/calculator/stone', {
      'stone_name': StoneName,
      'stone_amount_of_unit_of_measure': StoneAmountOfMeasure,
      'stone_quantity': StoneQuantity,
      'setting_type_string': StoneSettingType,
      'material_string': Material
    });
  }

  calculateMetalCost(AlloyName, AlloyAmountOfMeasureUnit, AlloyQuantity, ProductType, DifficultyType, FinishColor) {
    return this.httpClient.post<IMetalCost>('http://localhost:3000/calculator/metal', {
      'alloy_name': AlloyName,
      'alloy_amount_of_unit_of_measure': AlloyAmountOfMeasureUnit,
      'alloy_quantity': AlloyQuantity,
      'product_type': ProductType,
      'difficulty_type': DifficultyType,
      'finish_color': FinishColor
    });
  }

  calculateCncLaborCost(CncSize, CncType) {
    return this.httpClient.post<ICncCost>('http://localhost:3000/calculator/cnc', {
      'cnc_size': CncSize,
      'cnc_type': CncType
    });
  }

  calculateLaqueringLaborCost(LacqueringType) {
    return this.httpClient.post<ILacqueringCost>('http://localhost:3000/calculator/lacquering', {
      'lacquering_type': LacqueringType
    });
  }

  calculatePlatingLaborCost(PlatingType, ProductType, DifficultyType) {
    return this.httpClient.post<IPlatingCost>('http://localhost:3000/calculator/plating', {
      'plating_type': PlatingType,
      'product_type': ProductType,
      'difficulty_type': DifficultyType
    });
  }
}
