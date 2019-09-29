import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {
  // PRODUCT TYPE
  ProductType = [];
  DifficultyType = [];
  CncSize = [];
  CncType = [];
  DesignType = [];
  FinishColor = [];
  StoneName = [];
  SettingType = [];
  FindingName = [];
  Material = [];
  AlloyName = [];
  PlatingType = [];
  LacqueringType = [];
  FindingCost = 0;
  FindingLaborCost = 0;
  StoneCost = 0;
  StoneLaborCost = 0;
  MetalCost = 0;
  MetalLaborCost = 0;
  CncCost = 0;
  LacqueringCost = 0;
  PlatingCost = 0;
  constructor( private apicallService: ApicallService) {
  }

  ngOnInit() {
    this.apicallService.getCurrentWeather().subscribe((data) => {
      this.ProductType = data.product_type;
      this.DifficultyType = data.difficulty_type;
      this.CncSize = data.cnc.cnc_size;
      this.CncType = data.cnc.cnc_type;
      this.DesignType = data.design_type;
      this.FinishColor = data.finish_color;
      this.StoneName = data.stone_name;
      this.SettingType = data.setting_type;
      this.FindingName = data.finding_name;
      this.Material = data.material.material;
      this.AlloyName = data.alloy_name;
      this.PlatingType = data.plating_type;
      this.LacqueringType = data.lacquering_type;
      }
    );
  }

  onClickSubmit(data) {
    console.log(data);
    if ( data.finding_name && data.amount_of_measure_unit_finding && data.quantity_of_finding) {
      this.apicallService.calculateFindingCost(
        data.finding_name,
        data.amount_of_measure_unit_finding,
        data.quantity_of_finding
        ).subscribe((resp) => {
          this.FindingCost = resp.msg.total_finding_cost,
          this.FindingLaborCost = resp.msg.total_finding_labor_cost;
          }
        );
      }
    if ( data.stone_name && data.setting_type && data.amount_of_measure_unit_stone && data.quantity_of_stone && data.material) {
      this.apicallService.calculateStoneCost(
        data.stone_name,
        data.setting_type,
        data.amount_of_measure_unit_stone,
        data.quantity_of_stone,
        data.material
        ).subscribe((resp) => {
          this.StoneCost = resp.msg.total_stone_cost,
          this.StoneLaborCost = resp.msg.total_stone_labor_cost;
          }
        );
      }
    if ( data.alloy_name_string && data.alloy_amount_of_unit_of_measure && data.alloy_quantity
       && data.product_type_string && data.difficulty_type_string && data.finish_color_string) {
      this.apicallService.calculateMetalCost(
        data.alloy_name_string,
        data.alloy_amount_of_unit_of_measure,
        data.alloy_quantity,
        data.product_type_string,
        data.difficulty_type_string,
        data.finish_color_string
        ).subscribe((resp) => {
          this.MetalCost = resp.msg.casting_cost,
          this.MetalLaborCost = resp.msg.casting_labor_cost;
          }
        );
      }
    if ( data.cnc_size_string && data.cnc_type_string) {
      this.apicallService.calculateCncLaborCost(
        data.cnc_size_string,
        data.cnc_type_string,
        ).subscribe((resp) => {
          this.CncCost = resp.msg.cnc_labor_cost;
          }
        );
      }
    if ( data.lacquering_type_string) {
      this.apicallService.calculateLaqueringLaborCost(
        data.lacquering_type_string,
        ).subscribe((resp) => {
          this.LacqueringCost = resp.msg.lacquering_labor_cost;
          }
        );
      }
    if ( data.product_type_string && data.difficulty_type_string && data.plating_type_string) {
      this.apicallService.calculatePlatingLaborCost(
        data.plating_type_string,
        data.product_type_string,
        data.difficulty_type_string,
        ).subscribe((resp) => {
          this.PlatingCost = resp.msg.plating_labor_cost;
          }
        );
      }
  }
}
