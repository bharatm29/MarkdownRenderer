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
                    this.renderFontStyles();
                    break;

                case TokenType.PARAGRAPH:
                    const para = document.createElement("p");
                    para.innerText = this.curToken.literal;
                    this.renderArea.appendChild(para);
                    this.nextToken();
                    break;

                case TokenType.NEW_LINE:
                    this.renderArea.appendChild(document.createElement("br"));
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

        console.log(this.peekToken, this.curToken);
    }

    private expectPeek(expected: TokenType): boolean {
        if (this.peekToken.type === expected) {
            this.nextToken();
            return true;
        }

        this.renderArea.innerText =
            "Error with rendering things. Expected " +
            expected.toString() +
            ", but got " +
            this.peekToken.type.toString();

        return false;
    }

    private renderHeadings() {
        const renderHeading = (type: string) => {
            if (!this.expectPeek(TokenType.PARAGRAPH)) {
                return;
            }

            const heading = document.createElement(type);
            heading.innerText = this.curToken.literal;
            this.renderArea.appendChild(heading);
        };

        switch (this.curToken.type) {
            case TokenType.H1:
                renderHeading("h1");
                break;

            case TokenType.H2:
                renderHeading("h2");
                break;

            case TokenType.H3:
                renderHeading("h3");
                break;

            case TokenType.H4:
                renderHeading("h4");
                break;

            case TokenType.H5:
                renderHeading("h5");
                break;

            case TokenType.H6:
                renderHeading("h6");
                break;
        }

        this.nextToken();
    }

    private renderFontStyles() {
        const renderFontStyle = (type: string) => {
            if (!this.expectPeek(TokenType.PARAGRAPH)) {
                return;
            }

            const style = document.createElement(type);
            style.innerText = this.curToken.literal;
            this.renderArea.appendChild(style);

            if (
                !this.expectPeek(
                    type == "b" ? TokenType.BOLD : TokenType.ITTALIC
                )
            ) {
                return;
            }
        };

        switch (this.curToken.type) {
            case TokenType.BOLD:
                renderFontStyle("b");
                break;

            case TokenType.ITTALIC:
                renderFontStyle("i");
                break;
        }

        this.nextToken();
    }
}
