import React, { Component } from 'react';
import { Container, Icon, TextArea, Form, Button } from 'semantic-ui-react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      draftText: ''
    };
  }

  render() {
    return (
      <div className="App">
        <Container>
          <h1><Icon name='code' />Line number generator</h1>
          <p>ソースコードを貼り付けると行番号を追加したテキストを生成するツールです。</p>
          {/* <p>TeXを使えない情弱の君たちのためのツールだよ</p> */}
          <Form>
            <Form.Field>
              <TextArea
                onChange={e => this.setState({draftText: e.target.value})}
                placeholder='Input your code here!'
                style={{minHeight: 200}}
              />
            </Form.Field>

            {this.state.draftText.length === 0 ? (
              null
            ) : (
              <Form.Field>
                <Button
                  style={{marginBottom: '8px'}}
                  positive
                  icon
                  labelPosition='left'
                  onClick={() => execCopy(appendLineNumber(this.state.draftText))}
                ><Icon name='clipboard' />Copy</Button>
                <TextArea
                  value={appendLineNumber(this.state.draftText)}
                  autoHeight
                  readonly
                />
              </Form.Field>
            )}
          </Form>
        </Container>
      </div>
    );
  }
}

const appendLineNumber = (text) => {
  let result = '';
  const lines = text.split('\n');
  const maxDigit = String(lines.length).length
  
  lines.forEach((line, index) => {
    result += (index + 1) + ' '.repeat(1 + (maxDigit - (String(index).length))) + line + '\n'
  });

  return result;
};

const execCopy = (string) => {
  const temp = document.createElement('div');

  temp.appendChild(document.createElement('pre')).textContent = string;

  const s = temp.style;
  s.position = 'fixed';
  s.left = '-100%';

  document.body.appendChild(temp);
  document.getSelection().selectAllChildren(temp);

  const result = document.execCommand('copy');

  document.body.removeChild(temp);
  // true なら実行できている falseなら失敗か対応していないか
  return result;
}

export default App;
