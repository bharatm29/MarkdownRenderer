import { Token, TokenType } from "./token";

export class Lexer {
    private readPosition: number;
    private position: number;
    private ch: string;

    constructor(private input: string) {
        this.readPosition = this.position = 0;
        this.ch = "\0";

        this.readChar();
    }

    nextToken(): Token {
        let tok = new Token(TokenType.NULL, "");

        this.skipWhitespaces();

        switch (this.ch) {
            case "#":
                return this.readHeading();

            case "*":
            case "_":
                tok = this.readFontStyle();
                break;

            case "\n":
                tok = new Token(TokenType.NEW_LINE, "\n");
                break;

            case "\0":
                tok = new Token(TokenType.EOF, "");
                break;

            default:
                return this.readParagraph();
        }

        this.readChar();

        return tok;
    }

    private readChar() {
        if (this.readPosition >= this.input.length) {
            this.ch = "\0";
        } else {
            this.ch = this.input[this.readPosition];
        }

        this.position = this.readPosition;
        this.readPosition++;
    }

    private skipWhitespaces() {
        while (
            this.ch == " " ||
            // this.ch == "\n" ||
            this.ch == "\r" ||
            this.ch == "\t"
        ) {
            this.readChar();
        }
    }

    private readHeading(): Token {
        const pos = this.position;

        let astericCount = 0;

        while (this.ch === "#") {
            this.readChar();
            astericCount++;
        }

        if (this.ch !== " ") {
            return new Token(
                TokenType.ILLEGAL,
                this.input.substring(pos, this.position)
            );
        }

        this.readChar();

        const literal = this.input.substring(pos, this.position - 1);

        switch (astericCount) {
            case 1:
                return new Token(TokenType.H1, literal);
            case 2:
                return new Token(TokenType.H2, literal);
            case 3:
                return new Token(TokenType.H3, literal);
            case 4:
                return new Token(TokenType.H4, literal);
            case 5:
                return new Token(TokenType.H5, literal);
            case 6:
                return new Token(TokenType.H6, literal);
            default:
                return new Token(TokenType.ILLEGAL, literal);
        }
    }

    private readFontStyle(): Token {
        if (this.ch === "*") {
            if (this.input[this.readPosition] === "*") {
                this.readChar();
                return new Token(TokenType.BOLD, "**");
            } else {
                return new Token(TokenType.ITTALIC, "*");
            }
        } else {
            if (this.input[this.readPosition] === "_") {
                this.readChar();
                return new Token(TokenType.BOLD, "__");
            } else {
                return new Token(TokenType.ITTALIC, "_");
            }
        }
    }

    private readParagraph(): Token {
        let pos = this.position;

        while (this.isLiteralChar(this.ch)) {
            this.readChar();
        }

        return new Token(
            TokenType.PARAGRAPH,
            this.input.substring(pos, this.position)
        );
    }

    private isLiteralChar(ch: string): boolean {
        return !/[*_\n\0]+/.test(ch);
    }
}
