import { Lexer } from "../lexer/lexer";
import { Token, TokenType } from "../lexer/token";

export class MDRender {
    private curToken: Token;
    private peekToken: Token;

    private lex: Lexer;

    private renderArea: HTMLDivElement;

    constructor() {
        if (!document) {
            throw new Error("Document object is null");
        }

        const textArea = document.querySelector(
            ".text-input"
        ) as HTMLTextAreaElement;

        const renderArea = document.querySelector(".markdown-render");

        if (!renderArea) {
            throw new Error("Render area is null");
        }

        this.renderArea = renderArea as HTMLDivElement;
        renderArea.innerHTML = "";

        this.lex = new Lexer(textArea.value);

        this.curToken = this.peekToken = new Token(TokenType.NULL, "");

        this.nextToken();
        this.nextToken();
    }

    render() {
        while (this.curToken.type !== TokenType.EOF) {
            switch (this.curToken.type) {
                case TokenType.H1:
                case TokenType.H2:
                case TokenType.H3:
                case TokenType.H4:
                case TokenType.H5:
                case TokenType.H6:
                    this.renderHeadings();
                    break;

                case TokenType.BOLD:
                case TokenType.ITTALIC:
                    this.renderFontStyle();
                    break;

                case TokenType.PARAGRAPH:
                    const para = document.createElement("p");
                    para.innerText = this.curToken.literal;
                    this.renderArea.appendChild(para);
                    this.nextToken();
                    break;

                default:
                    this.renderArea.innerText =
                        "Error with rendering things. Illegal or unhandled token encountered";
                    return;
            }
        }

        console.log("done");
    }

    private nextToken() {
        this.curToken = this.peekToken;
        this.peekToken = this.lex.nextToken();
    }

    private renderHeadings() {
        switch (this.curToken.type) {
            case TokenType.H1:
                const h1 = document.createElement("h1");
                h1.innerText = this.curToken.literal;
                this.renderArea.appendChild(h1);
                break;

            case TokenType.H2:
                const h2 = document.createElement("h2");
                h2.innerText = this.curToken.literal;
                this.renderArea.appendChild(h2);
                break;

            case TokenType.H3:
                const h3 = document.createElement("h3");
                h3.innerText = this.curToken.literal;
                this.renderArea.appendChild(h3);
                break;

            case TokenType.H4:
                const h4 = document.createElement("h4");
                h4.innerText = this.curToken.literal;
                this.renderArea.appendChild(h4);
                break;

            case TokenType.H5:
                const h5 = document.createElement("h5");
                h5.innerText = this.curToken.literal;
                this.renderArea.appendChild(h5);
                break;

            case TokenType.H6:
                const h6 = document.createElement("h6");
                h6.innerText = this.curToken.literal;
                this.renderArea.appendChild(h6);
                break;
        }

        this.nextToken();
    }

    private renderFontStyle() {
        switch (this.curToken.type) {
            case TokenType.BOLD:
                const boldText = document.createElement("b");
                boldText.innerText = this.curToken.literal;
                this.renderArea.appendChild(boldText);
                break;

            case TokenType.ITTALIC:
                const itallicText = document.createElement("i");
                itallicText.innerText = this.curToken.literal;
                this.renderArea.appendChild(itallicText);
                break;
        }

        this.nextToken();
    }
}
