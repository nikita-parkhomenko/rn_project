import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionCodes from '../../../constants/QuestionCodes';
import { DocumentWithPhotoKey } from '../../../queries';
import AnswerViewOnly from './AnswerViewOnly';

export interface QuestionAnswer {
  value?: any;
}

interface QuestionContentViewOnlyProps {
  questionCode: string;
  answer: string;
  photos?: Pick<DocumentWithPhotoKey, 'documentId' | 'photoKey'>[];
}

export default function QuestionContentViewOnly({ questionCode, answer, photos }: QuestionContentViewOnlyProps) {
  const getQuestionComponent = () => {
    switch (questionCode) {
      case QuestionCodes.FireStoppingUsed:
        return <AnswerViewOnly answer={answer} fireStop={true} photos={photos} />;
      case QuestionCodes.DoorFrameFixingCount:
        return <AnswerViewOnly answer={answer} photos={photos} />;
      case QuestionCodes.DoorCloserAdjusted:
        return <AnswerViewOnly answer={answer} photos={photos} caption="(Closes the door from 75mm)" />;
      case QuestionCodes.DoorFrameFixedSecurely:
        return <AnswerViewOnly answer={answer} photos={photos} caption="(No movement)" />;
      case QuestionCodes.GapThresholdCorrect:
        return <AnswerViewOnly answer={answer} photos={photos} caption="(Max 10mm or 3mm smoke seal)" />;
      case QuestionCodes.DoorFurnitureFitted:
        return <AnswerViewOnly answer={answer} photos={photos} caption="(Not loose)" />;
      default:
        return <AnswerViewOnly answer={answer} photos={photos} />;
    }
  };

  return <View style={styles.questionContent}>{getQuestionComponent()}</View>;
}

const styles = StyleSheet.create({
  questionContent: {
    padding: 20,
    backgroundColor: '#222333',
    marginTop: -10,
    marginBottom: 10,
  },
});
