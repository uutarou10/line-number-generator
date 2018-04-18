import React, { Component } from 'react';
import { Container, Icon, TextArea, Form, Button, Checkbox } from 'semantic-ui-react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      draftText: '',
      usePipe: true 
    };
  }

  render() {
    return (
      <div className="App">
        <Container>
          <h1><Icon name='code' />Line number generator</h1>
          <p>ソースコードを貼り付けると行番号を追加したテキストを生成するツールです。</p>
          <p>動作は保証しません。自己責任で使用してください。</p>
          {/* <p>TeXを使えない情弱の君たちのためのツールだよ</p> */}
          <Form>
            <Form.Field>
              <Checkbox
                toggle
                checked={this.state.usePipe}
                label='行番号にパイプ( | )をつける'
                onClick={() => this.setState({usePipe: !this.state.usePipe})}
              />
            </Form.Field>
            <Form.Field>
              <TextArea
                onChange={e => this.setState({
                  draftText: e.target.value
                })}
                placeholder='Input your code here!'
                style={{
                  minHeight: 200,
                  fontFamily: "Consolas, 'Courier New', Courier, Monaco, monospace"
                }}
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
                  onClick={() => execCopy(appendLineNumber(this.state.draftText, this.state.usePipe))}
                ><Icon name='clipboard' />Copy</Button>
                <TextArea
                  value={appendLineNumber(this.state.draftText, this.state.usePipe)}
                  autoHeight
                  readOnly
                  style={{fontFamily: "Consolas, 'Courier New', Courier, Monaco, monospace"}}
                />
              </Form.Field>
            )}
          </Form>
        </Container>
      </div>
    );
  }
}

const appendLineNumber = (text, usePipe = true) => {
  let result = '';
  const lines = text.split('\n');
  const maxDigit = String(lines.length).length
  
  lines.forEach((line, index) => {
    result += (index + 1) + (' '.repeat((maxDigit - String(index + 1).length) + 1)) + (usePipe ? '| ' : '') + line + '\n'
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
