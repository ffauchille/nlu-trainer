import { Example } from "./example";

export class ModelEvaluation {
  intent_evaluation: TestSuiteEvaluation;

  constructor(props: Partial<ModelEvaluation>) {
    this.intent_evaluation = new TestSuiteEvaluation(
      props.intent_evaluation || {}
    );
  }
}

export class TestSuiteEvaluation {
  report: string;
  predictions: Prediction[];
  precision: number;
  f1_score: number;
  accuracy: number;

  constructor(props: Partial<TestSuiteEvaluation>) {
    this.report = props.report || "";
    this.predictions = (props.predictions || []).map(
      prediction => new Prediction(prediction)
    );
    this.precision = props.precision || 0;
    this.f1_score = props.f1_score || 0;
    this.accuracy = props.accuracy || 0;
  }
}

export class Prediction {
  text: string;
  intent: string;
  predicted: string;
  confidence: number;

  constructor(props: Partial<Prediction>) {
    this.text = props.text || "";
    this.intent = props.intent || "";
    this.predicted = props.predicted || "";
    this.confidence = props.confidence || -1;
  }
}

export class TestSuiteCreation {
  appId: string;
  name: string;

  constructor(props: Partial<TestSuiteCreation>) {
    this.appId = props.appId || "";
    this.name = props.name || new Date().toISOString();
  }
}

export class TestExample {
  text: string
  intent: string
  entities: string[]

  constructor(props: Partial<TestExample>) {
    this.text = props.text || ""
    this.intent = props.intent || ""
    this.entities = props.entities || []
  }
}

export class TestSuite {
  _id: string;
  name: string;
  appId: string;
  lastRunAt: number;
  testExamples: TestExample[];

  constructor(props: Partial<TestSuite>) {
    this._id = props._id || "";
    this.name = props.name || "";
    this.appId = props.appId || "";
    this.lastRunAt = props.lastRunAt || 0;
    this.testExamples = (props.testExamples || []).map(
      line => new TestExample(line)
    );
  }
}