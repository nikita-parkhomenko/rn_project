import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionCodes from '../../../constants/QuestionCodes';
import ChecklistPhotoEvidence from '../common/ChecklistPhotoEvidence';
import PhotoEvidenceGapsSlabFrameToleranceInstallation from './PhotoEvidenceGapsSlabFrameToleranceInstallation';
import PhotoEvidenceIsDoorComplete from './PhotoEvidenceIsDoorComplete';
import QuestionBoolean from '../common/QuestionBoolean';
import QuestionDoorCloserInternalExternal from './QuestionDoorCloserInternalExternal';
import QuestionDoorFrameFixingCount from './QuestionDoorFrameFixingCount';
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
      case QuestionCodes.DoorFrameFixingCount:
        return <QuestionDoorFrameFixingCount onAnswered={onAnswered} answer={answer} />;
      case QuestionCodes.DoorCloserAdjusted:
        return (
          <QuestionNullableBoolean onAnswered={onAnswered} caption="(Closes the door from 75mm)" answer={answer} />
        );
      case QuestionCodes.DoorFrameFixedSecurely:
        return <QuestionBoolean onAnswered={onAnswered} caption="(No movement)" answer={answer} />;
      case QuestionCodes.GapThresholdCorrect:
        return <QuestionBoolean onAnswered={onAnswered} caption="(Max 10mm or 3mm smoke seal)" answer={answer} />;
      case QuestionCodes.DoorFurnitureFitted:
        return <QuestionBoolean onAnswered={onAnswered} caption="(Not loose)" answer={answer} />;
      case QuestionCodes.DoorCloserInternalExternal:
        return <QuestionDoorCloserInternalExternal onAnswered={onAnswered} answer={answer} />;
      case QuestionCodes.DoorLockWork:
      case QuestionCodes.SmokeSealsFitted:
      case QuestionCodes.GlazingSecure:
      case QuestionCodes.FireSignageFitted:
        return <QuestionNullableBoolean onAnswered={onAnswered} answer={answer} />;
      case QuestionCodes.FireStoppingUsed:
        return <QuestionFireStopping onAnswered={onAnswered} answer={answer} />;
      default:
        return <QuestionBoolean onAnswered={onAnswered} answer={answer} />;
    }
  };

  const getPhotoComponent = () => {
    switch (questionCode) {
      case QuestionCodes.GapsSlabFrameTolerance:
        return <PhotoEvidenceGapsSlabFrameToleranceInstallation />;
      case QuestionCodes.DoorComplete:
        return <PhotoEvidenceIsDoorComplete />;
      case QuestionCodes.FireStoppingUsed:
        return <ChecklistPhotoEvidence label="Photo of product" questionCode={questionCode} />;
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
