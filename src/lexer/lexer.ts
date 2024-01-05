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
                tok = this.readHeading();
                break;

            case "*":
            case "_":
                tok = this.readFontStyle();
                break;

            case "\0":
                tok = new Token(TokenType.EOF, "");
                break;

            default:
                if (this.isLetter(this.ch)) {
                    tok = this.readParagraph();
                } else {
                    tok = new Token(TokenType.ILLEGAL, "");
                }
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
            this.ch == "\n" ||
            this.ch == "\r" ||
            this.ch == "\t"
        ) {
            this.readChar();
        }
    }

    private readHeading(): Token {
        let astericCount = 0;

        while (this.ch !== " ") {
            this.readChar();
            astericCount++;
        }

        //TODO: Handle the case where the next character is not a space

        this.readChar();

        const pos = this.position;

        while ((this.ch as string) !== "\n") {
            this.readChar();
        }

        const literal = this.input.substring(pos, this.position);

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

    private readBold(): Token {
        this.readChar();
        this.readChar();

        let pos = this.position;

        while (
            !(
                (this.ch === "*" && this.input[this.readPosition] === "*") ||
                (this.ch === "_" && this.input[this.readPosition] === "_")
            )
        ) {
            this.readChar();
        }

        this.readChar();

        return new Token(
            TokenType.BOLD,
            this.input.substring(pos, this.position - 1)
        );
    }

    private readIttalic(): Token {
        this.readChar();

        let pos = this.position;

        while (!(this.ch === "*" || this.ch === "_")) {
            this.readChar();
        }

        return new Token(
            TokenType.ITTALIC,
            this.input.substring(pos, this.position)
        );
    }

    private readFontStyle(): Token {
        if (
            (this.ch === "*" && this.input[this.readPosition] === "*") ||
            (this.ch === "_" && this.input[this.readPosition] === "_")
        ) {
            return this.readBold();
        } else {
            return this.readIttalic();
        }
    }

    private readParagraph(): Token {
        let pos = this.position;

        while (this.ch !== "\n" && this.isLetter(this.ch)) {
            this.readChar();
        }

        return new Token(
            TokenType.PARAGRAPH,
            this.input.substring(pos, this.position)
        );
    }

    private isLetter(char: string) {
        return (char >= "0" && char <= "9") || (char >= "A" && char <= "z");
    }
}
