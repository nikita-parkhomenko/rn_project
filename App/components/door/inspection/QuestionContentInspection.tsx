import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionCodes from '../../../constants/QuestionCodes';
import ChecklistPhotoEvidence from '../common/ChecklistPhotoEvidence';
import PhotoEvidenceGapsSlabFrameToleranceInspection from '../inspection/PhotoEvidenceGapsSlabFrameToleranceInspection';
import PhotoEvidenceFireFrameStoppedInspection from '../inspection/PhotoEvidenceFireFrameStoppedInspection';
import GapThresholdWithMeasurement from './QuestionGapThresholdMeasurement';
import QuestionBoolean from '../common/QuestionBoolean';
import QuestionFireStopping from '../common/QuestionFireStopping';
import QuestionNullableBoolean from '../common/QuestionNullableBoolean';

export interface QuestionAnswer {
  value?: any;
}

interface QuestionContentProps {
  onAnswered: (result: QuestionAnswer) => void;
  questionCode: string;
  answer: any;
  photoRequired: boolean;
}

export default function QuestionContent({ onAnswered, questionCode, answer, photoRequired }: QuestionContentProps) {
  const getQuestionComponent = () => {
    switch (questionCode) {
      case QuestionCodes.GapThresholdCorrectInsp:
        return <GapThresholdWithMeasurement onAnswered={onAnswered} answer={answer} />;
      case QuestionCodes.DoorCloserFittedInsp:
        return <QuestionNullableBoolean onAnswered={onAnswered} answer={answer} NAAnswerTextOverride="Not Required" />;
      case QuestionCodes.HoldOpenDeviceFittedInsp:
        return <QuestionNullableBoolean onAnswered={onAnswered} answer={answer} NAAnswerTextOverride="No Device" />;
      case QuestionCodes.FrameFireStoppedInsp:
        return (
          <QuestionNullableBoolean onAnswered={onAnswered} answer={answer} NAAnswerTextOverride="Unable to Confirm" />
        );
      case QuestionCodes.DoorCloserAdjustedInsp:
      case QuestionCodes.DoorLatchWhenClosedInsp:
      case QuestionCodes.DoorLockWorkInsp:
      case QuestionCodes.SmokeSealsUndamagedInsp:
      case QuestionCodes.AirGrillesUndamagedInsp:
      case QuestionCodes.FireSignageFittedInsp:
      case QuestionCodes.LetterPlateUndamagedInsp:
        return <QuestionNullableBoolean onAnswered={onAnswered} answer={answer} />;
      case QuestionCodes.FireStoppingUsedInsp:
        return <QuestionFireStopping onAnswered={onAnswered} answer={answer} showUnableToConfirm={true} />;
      default:
        return <QuestionBoolean onAnswered={onAnswered} answer={answer} />;
    }
  };

  const getPhotoComponent = () => {
    switch (questionCode) {
      case QuestionCodes.GapsSlabFrameToleranceInsp:
        return <PhotoEvidenceGapsSlabFrameToleranceInspection />;
      case QuestionCodes.FrameFireStoppedInsp:
        return <PhotoEvidenceFireFrameStoppedInspection />;
      default:
        return <ChecklistPhotoEvidence questionCode={questionCode} />;
    }
  };

  return (
    <View style={styles.questionContent}>
      {getQuestionComponent()}
      {photoRequired && getPhotoComponent()}
    </View>
  );
}

const styles = StyleSheet.create({
  questionContent: {
    padding: 20,
    backgroundColor: '#222333',
    marginTop: -10,
    marginBottom: 10,
  },
});
