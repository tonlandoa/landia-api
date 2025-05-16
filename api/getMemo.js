import { beginCell } from "@ton/core";

export default function handler(req, res) {
    const { comment } = req.query;

    if (!comment) {
        return res.status(400).json({
            error: "Parameter 'comment' is required",
        });
    }

    try {
        const body = beginCell()
            .storeUint(0, 32)
            .storeStringTail(comment)
            .endCell();

        const base64Result = body.toBoc().toString("base64");

        res.status(200).json({ comment: base64Result });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "An error occurred while processing the request",
        });
    }
}
