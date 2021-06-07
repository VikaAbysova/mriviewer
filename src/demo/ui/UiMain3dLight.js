/**
 * @fileOverview UiMain3dLight
 * @author Epam
 * @version 1.0.0
 */


// ********************************************************
// Imports
// ********************************************************

import React from 'react';
import { connect } from 'react-redux';

import UiCtrl3dLight from './UiCtrl3dLight';
import UiCtrl3d from './UiCtrl3d';
import Graphics3d from '../engine/Graphics3d';
import 'nouislider/distribute/nouislider.css';

import Nouislider from 'react-nouislider';
import StoreActionType from '../store/ActionTypes';
import ModeView from '../store/ModeView';
import ExploreTools from "./Tollbars/ExploreTools";

class UiMain3dLight extends React.Component {
  /**
   * Main component render func callback
   */
  constructor(props) {
    super(props);
    this.m_updateEnable = true;
  }

  onChangeSliderBrightness() {
    this.m_updateEnable = false;
    const aval = this.refs.sliderBrightness.slider.get();
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_SLIDER_Brightness, sliderBrightness: Number.parseFloat(aval) });
  }

  onChangeSliderCut() {
    this.m_updateEnable = false;
    const aval = this.refs.sliderCut.slider.get();
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_SLIDER_Cut, sliderCut: Number.parseFloat(aval) });
  }

  onChangeSliderQuality() {
    this.m_updateEnable = false;
    const aval = this.refs.sliderQuality.slider.get();
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_SLIDER_Quality, sliderQuality: Number.parseFloat(aval) });
  }

  onChangeSliderContrast3D() {
    this.m_updateEnable = false;
    const aval = this.refs.sliderContrast3D.slider.get();
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_SLIDER_Contrast3D, sliderContrast3D: Number.parseFloat(aval) });
  }

  /*
  shouldComponentUpdate() {
    //return this.m_updateEnable;
    return true;
  }
  */
  shouldComponentUpdate(nextProps) {
    //return this.m_updateEnable;
    let flag = this.m_updateEnable;
    if (this.props.isTool3D !== nextProps.isTool3D || this.props.modeView !== nextProps.modeView) {
      flag = true;
    }
    return flag;
    //return true;
  }

  //{(store.isTool3D === false) ? jsxView : jsxTool}
  render() {
    const store = this.props;
    const modeViewIndex = store.modeView;

    const sliderBrightness = store.sliderBrightness;
    const sliderCut = store.sliderCut;
    const sliderQuality = store.sliderQuality;

    const wArrBrightness = [sliderBrightness];
    const wArrCut = [sliderCut];
    const wArrQuality = [sliderQuality];
    const jsx3dLight = <UiCtrl3dLight/>;
    const jsx3d = <UiCtrl3d/>;

    const jsxArray = new Array(ModeView.VIEW_COUNT);
    jsxArray[ModeView.VIEW_3D_LIGHT] = jsx3dLight;
    jsxArray[ModeView.VIEW_3D] = jsx3d;
    const jsxRet = jsxArray[modeViewIndex];
    const jsxView = <>
      <p> Brightness </p>
      <Nouislider onSlide={this.onChangeSliderBrightness.bind(this)} ref={'sliderBrightness'}
                  range={{ min: 0.0, max: 1.0 }}
                  overflow-scroll={'true'}
                  start={wArrBrightness} connect={[false, false]} step={0.02} tooltips={true}/>
      <p> Quality </p>
      <Nouislider onSlide={this.onChangeSliderQuality.bind(this)} ref={'sliderQuality'}
                  range={{ min: 0.0, max: 1.0 }}
                  overflow-scroll={'true'}
                  start={wArrQuality} connect={[false, false]} step={0.02} tooltips={true}/>
    </>
    const jsxTool = <>
      <p> Cut plane opacity </p>
      <Nouislider onSlide={this.onChangeSliderContrast3D.bind(this)} ref={'sliderContrast3D'}
                  range={{ min: 0.0, max: 1.0 }}
                  overflow-scroll={'true'}
                  start={wArrBrightness} connect={[false, false]} step={0.02} tooltips={true}/>
      <ExploreTools/>
    </>

    return <>
      {jsxRet}
      <p> Cut </p>
      <Nouislider onSlide={this.onChangeSliderCut.bind(this)} ref={'sliderCut'}
                  range={{ min: 0.0, max: 1.0 }}
                  overflow-scroll={'true'}
                  start={wArrCut} connect={[false, false]} step={0.01} tooltips={true}/>
      {(store.isTool3D === false) ? jsxView : jsxTool}
      <Graphics3d/>
    </>;
  };
}

export default connect(store => store)(UiMain3dLight);
