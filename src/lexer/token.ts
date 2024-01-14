export enum TokenType {
    EOF = "Eof",
    NULL = "Null",
    ILLEGAL = "Illegal",
    LITERAL = "Literal",

    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    H5 = "h5",
    H6 = "h6",

    ASTERIC = "Asteric",

    PARAGRAPH = "Paragraph",

    BOLD = "Bold",
    ITTALIC = "Ittalic",

    CODE_BLOCK = "Code_block",

    NEW_LINE = "New_line",
}

export class Token {
    constructor(
        public type: TokenType,
        public literal: string
    ) {}
}
